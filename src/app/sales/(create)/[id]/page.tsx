import Head from "next/head";
import { useRouter } from 'next/navigation';

export default function NewSale() {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>Create Sale</title>
      </Head>
      <button type="button" onClick={() => {router.push('./')}} className="btn-gray absolute right-4 top-20"> Back </button>
      <h1 className="text-center justify-text-3xl font-medium p-12 dark:text-white">Create a new sale</h1>
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
    </main>
  );
}