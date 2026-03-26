export default function Card({ title, description }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '8px',
      margin: '8px',
      minWidth: '200px',
      backgroundColor: '#f9f9f9',
      color: '#333'
    }}>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      <p style={{ marginBottom: 0 }}>{description}</p>
    </div>
  )
}
