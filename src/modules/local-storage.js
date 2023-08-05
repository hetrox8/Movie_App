import axios from 'axios';

const getAppName = () => {
  const appName = localStorage.getItem('appName');
  return appName;
};

const saveAppName = (appName) => {
  const existingAppName = getAppName();
  if (!existingAppName) {
    localStorage.setItem('appName', appName);
  }
};

const createApp = async () => {
  try {
    const itemId = 'Vidvib';

    const response = await axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
      item_id: itemId,
    });

    const result = response.data;
    saveAppName(result);
  } catch (error) {
    console.log('Error');
  }
};

export { getAppName, createApp };