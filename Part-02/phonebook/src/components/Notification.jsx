const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: '#f2f2f2',
    fontSize: 18,
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }

  return <div style={style}>{message}</div>
}

export default Notification
