import { jql, port, maxResults } from '../../config/config.local'

export const getIssues = () => {
  const { protocol, hostname } = window.location
  const url = `${protocol}//${hostname}:${port}/api/search?jql=${jql}&maxResults=${maxResults}&fields=status`
  return fetch(url)
    .then(response => response.json())
    .then(json => json.issues)
}

export const getSummary = issues => {
  const colors = {
    green: 'done',
    yellow: 'doing',
    'blue-gray': 'todo'
  }
  const types = {
    done: 0,
    doing: 0,
    todo: 0
  }
  issues.forEach(issue => {
    const color = issue.fields.status.statusCategory.colorName
    types[colors[color]]++
  })
  return types
}

export default {
  getIssues,
  getSummary
}
