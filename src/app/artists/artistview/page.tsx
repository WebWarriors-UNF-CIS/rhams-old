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
                        <th className="">Medium</th>
                        <th>Title</th>
                        <th className="">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Oil on Canvas</td>
                        <td>The Starry Night</td>
                        <td>1889</td>
                    </tr>
                    <tr>
                        <td>Watercolor</td>
                        <td>Sunflowers</td>
                        <td>1888</td>
                    </tr>
        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default ArtistView;
