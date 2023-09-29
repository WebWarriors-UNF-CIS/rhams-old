import { remult } from 'remult';
import { NextResponse } from 'next/server';
import { Artist } from '../../shared/artist';

const artistRepo = remult.repo(Artist);


export default async function handler(req: { method: string; body: { firstName: any; lastName: any; datesLived: any; nationality: any; primaryMedium: any; website: any; biography: any; artistNotes: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { success: boolean; message?: string; error?: string; }): void; new(): any; }; }; }) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    try {
      const { firstName, lastName, datesLived, nationality, primaryMedium, website, biography, artistNotes } = req.body;
  
    
      console.log('Received form data:', { firstName, lastName, datesLived, nationality, primaryMedium, website, biography, artistNotes });
  
     
      res.status(200).json({ success: true, message: 'Artist information submitted successfully' });
    } catch (error) {
      
      console.error('Error processing form:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
  