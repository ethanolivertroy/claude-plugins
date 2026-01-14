import { createClient } from './client.js';

export class NotesAPI {
  constructor(client = null) {
    this.client = client || createClient();
  }

  /**
   * Create a new note
   * @param {Object} noteData - Note data
   * @param {string} noteData.name - Note title
   * @param {string} [noteData.content] - Note content (markdown)
   * @param {Array} [noteData.tags] - Tags array [{text: "tag", color: "blue"}]
   */
  async create(noteData) {
    return this.client.post('/notes', noteData);
  }

  /**
   * Get a note by UUID
   * @param {string} uuid - Note UUID
   */
  async get(uuid) {
    return this.client.get(`/notes/${uuid}`);
  }

  /**
   * Update an existing note
   * @param {string} uuid - Note UUID
   * @param {Object} updates - Fields to update
   */
  async update(uuid, updates) {
    return this.client.put(`/notes/${uuid}`, updates);
  }

  /**
   * Delete a note
   * @param {string} uuid - Note UUID
   */
  async delete(uuid) {
    return this.client.delete(`/notes/${uuid}`);
  }

  /**
   * Add a task to a note
   * @param {string} noteUuid - Note UUID
   * @param {Object} taskData - Task data
   * @param {string} taskData.content - Task text
   * @param {string} [taskData.startAt] - Start date/time
   * @param {string} [taskData.hideUntil] - Hide until date
   */
  async addTask(noteUuid, taskData) {
    return this.client.post(`/notes/${noteUuid}/actions`, {
      type: 'addTask',
      ...taskData
    });
  }

  /**
   * Search notes (if supported by API)
   * @param {string} query - Search query
   */
  async search(query) {
    const params = new URLSearchParams({ q: query });
    return this.client.get(`/notes?${params.toString()}`);
  }

  /**
   * List notes with optional filters
   * @param {Object} options - Filter options
   */
  async list(options = {}) {
    const params = new URLSearchParams(options);
    const queryString = params.toString();
    const endpoint = queryString ? `/notes?${queryString}` : '/notes';
    return this.client.get(endpoint);
  }
}

export function createNotesAPI(client = null) {
  return new NotesAPI(client);
}
