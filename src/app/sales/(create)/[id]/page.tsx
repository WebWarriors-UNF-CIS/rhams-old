export default function NewSale() {
  return (
    <form className="form">
      <div className="input">
        <label htmlFor="saleDate">Date</label>
        <input type="date" id="saleDate" />
      </div>
      <div className="input">
        <label htmlFor="salePrice">Price</label>
        <input type="text" id="price" />
      </div>
      <div className="input">
        <label htmlFor="saleBuyer">Buyer</label>
        <input type="text" id="saleBuyer" />
      </div>
      <div className="input">
        <label htmlFor="saleFoundry">Foundry</label>
        <input type="text" id="saleFoundry" />
      </div>
      <div className="input">
        <label htmlFor="loaction">New Location</label>
        <input type="text" id="location" />
      </div>
      <div className="input">
        <label htmlFor="saleRights">Rights</label>
        <input type="text" id="saleRights" />
      </div>
      <div className="input">
        <label htmlFor="saleNotes">Notes</label>
        <input type="text" id="saleNotes" />
      </div>
      <button type="submit" className="btn-green">Create Sale</button>
    </form>
  );
}