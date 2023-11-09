import Link from 'next/link';
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { remult } from "remult"
import 'src/app/globals.css'
import { Artist } from '../../shared/artist';
import React from 'react';
import reubenPic from 'src/images/reuben.png'
import Image from 'next/image'



function ArtistView() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-5">
        <div>
            <h1 className="dark:text-white text-2xl"  >Reuben Hale</h1>
            <Image className="max-w-xs"src={reubenPic} alt="Reuben Hale" />
        </div>
        <div>
            <div>
                <h1 className="dark:text-white text-2xl">Artworks</h1>
                <table>
                    <thead>
                    <tr className="border border-solid ">
                        <th className="border border-solid px-4 py-2">Medium</th>
                        <th className="border border-solid px-4 py-2">Title</th>
                        <th className="border border-solid px-4 py-2">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border border-solid px-4 py-2">
                        <td className="border border-solid px-4 py-2">Oil on Canvas</td>
                        <td className="border border-solid px-4 py-2">The Starry Night</td>
                        <td className="border border-solid px-4 py-2">1889</td>
                    </tr>
                    <tr>
                        <td className="border border-solid px-4 py-2">Watercolor</td>
                        <td className="border border-solid px-4 py-2">Sunflowers</td>
                        <td className="border border-solid px-4 py-2">1888</td>
                    </tr>
        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default ArtistView;
