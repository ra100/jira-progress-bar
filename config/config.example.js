module.exports = {
  user: 'me',
  password: '123',
  jql: 'project = PROJ AND "Epic Link" = PROJ-123 ORDER BY created DESC',
  jiraUrl: 'https://jira.example.com',
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  port: 8081,
  maxResults: 200
}
