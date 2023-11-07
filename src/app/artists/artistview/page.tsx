import Link from 'next/link';
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import '../../globals.css'
import { Artist } from '../../shared/artist';
import React from 'react';



function ArtistTable() {
  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold">Page where an artist&rsquo;s profile shows</h1>
    </div>
  );
}

export default ArtistTable;
