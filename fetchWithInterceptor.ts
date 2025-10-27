export const fetchWithInterceptor = async (url: string, options: RequestInit = {}) => {
  // Добавляем headers или другую логику перед запросом
  const enhancedOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Test': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, enhancedOptions);
    
    // Обработка ответа
    if (!response.ok) {
      // Обработка ошибок
      if (response.status === 401) {
        // Логика для unauthorized
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    // Обработка ошибок сети
    console.error('Fetch error:', error);
    throw error;
  }
};