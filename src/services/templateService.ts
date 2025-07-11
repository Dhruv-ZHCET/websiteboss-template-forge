
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

export const templateService = {
  async getTemplates() {
    const response = await fetch(`${API_BASE_URL}/templates`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }

    return response.json();
  },

  async getTemplate(id: string) {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch template');
    }

    return response.json();
  },

  async getTemplatesByIndustry(industry: string) {
    const response = await fetch(`${API_BASE_URL}/templates?industry=${industry}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }

    return response.json();
  }
};
