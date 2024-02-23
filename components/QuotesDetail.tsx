export default function QuotesDetail() {
  const quoteDetails = {
    dateCreated: '02/23/2001',
    numberOfGallons: 64,
    rate: 2.42,
    totalPrice: 154.88,
    name: 'John Doe',
    address: '123 Main Street',
    city: 'Houston',
    state: 'TX'
  };

  const cardStyle = {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '0.5rem auto 1rem auto',
    width: 'auto', 
    maxWidth: 'calc(100% - 2rem)', 
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.9rem', 
  };

  const headerStyle = {
    fontWeight: 'bold',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem'
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <div style={cardStyle}>
        <div style={headerStyle}>Personal Information</div>
        <p><strong>Name:</strong> {quoteDetails.name}</p>
        <p><strong>Address:</strong> {quoteDetails.address}</p>
        <p><strong>City:</strong> {quoteDetails.city}</p>
        <p><strong>State:</strong> {quoteDetails.state}</p>
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>Quote Information</div>
        <p><strong>Date Created:</strong> {quoteDetails.dateCreated}</p>
        <p><strong># of Gallons:</strong> {quoteDetails.numberOfGallons}</p>
        <p><strong>Rate:</strong> ${quoteDetails.rate.toFixed(2)}</p>
        <p><strong>Total Price:</strong> ${quoteDetails.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};
