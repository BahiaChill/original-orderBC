const SPREADSHEET_ID = '1iC0FXi3mwMPRglfDnPGkz7fQUNOozCraOOHvnz5fRVU';
const HISTORY_SHEET = 'Historial_Pedidos';
const INVENTORY_SHEET = 'Inventario';

const initClient = () => {
  return new Promise((resolve, reject) => {
    try {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/spreadsheets',
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
        }).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    } catch (error) {
      reject(new Error('Error al cargar la API de Google'));
    }
  });
};

const checkAuth = async () => {
  if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
    await gapi.auth2.getAuthInstance().signIn();
  }
};

const appendOrder = async (orderData) => {
  await checkAuth();
  
  const values = [
    [
      new Date().toISOString(),
      orderData.table,
      JSON.stringify(orderData.items),
      orderData.total,
      orderData.user
    ]
  ];

  try {
    const response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${HISTORY_SHEET}!A:E`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values }
    });
    return response;
  } catch (error) {
    console.error('Error al guardar pedido:', error);
    throw error;
  }
};

const updateInventory = async (productName, quantitySold) => {
  await checkAuth();

  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${INVENTORY_SHEET}!A:B`
    });

    const values = response.result.values;
    const rowIndex = values.findIndex(row => row[0] === productName);

    if (rowIndex === -1) {
      throw new Error('Producto no encontrado en el inventario');
    }

    const currentStock = parseInt(values[rowIndex][1]) - quantitySold;
    if (currentStock < 0) {
      throw new Error('Stock no puede ser negativo');
    }

    const updateResponse = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${INVENTORY_SHEET}!B${rowIndex + 1}`,
      valueInputOption: 'RAW',
      resource: { values: [[currentStock]] }
    });

    return updateResponse;
  } catch (error) {
    console.error('Error al actualizar inventario:', error);
    throw error;
  }
};

const sendOrder = async (orderData) => {
  try {
    await initClient();
    
    // Primero actualizar inventario para cada producto
    for (const item of orderData.items) {
      await updateInventory(item.name, item.quantity);
    }
    
    // Luego guardar el pedido
    const response = await appendOrder(orderData);
    return response;
  } catch (error) {
    console.error('Error en el proceso completo:', error);
    throw error;
  }
};

export default {
  initClient,
  sendOrder
};