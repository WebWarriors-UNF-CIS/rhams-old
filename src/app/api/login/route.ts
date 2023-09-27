import { remult } from 'remult';
import { User } from '../../shared/user';
import { NextResponse } from 'next/server';

const userRepo = remult.repo(User);

export async function POST(request: Request) {
    const { email, password } = request.body as any;
    const user = await userRepo.findFirst({ email: email, password: password });
    if (user) {
        return new NextResponse(JSON.stringify(user));
    } else {
        return new NextResponse(JSON.stringify({ errorMessage: 'User not found'}), { status: 404 });
    }
}