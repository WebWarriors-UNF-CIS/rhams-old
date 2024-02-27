"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sale } from "../_shared/sale";
import { remult } from "remult";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => { remult.repo(Sale).find().then(setSales) }, []);
  return (
    <main>
      <Head>
        <title>View Sales</title>
      </Head>
      <Link href="/sales/create"><button className="btn-green absolute right-4 top-20"> Add Sale </button></Link>
      <h1 className="text-center justify-text-3xl font-medium p-12 dark:text-white">Sales will go here!</h1>
      <div className="col-span-3">
        {sales.map((sale) => (
          <div key={sale.id}>
            <h2>{sale.date}</h2>
            <h3>{sale.price}</h3>
            <h4>{sale.notes}</h4>
          </div>
        ))}
      </div>
    </main>
  );
}