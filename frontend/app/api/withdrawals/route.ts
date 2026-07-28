import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletId, bankAccountId, amount, reason } = body;

    // Call backend to create withdrawal
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.headers.get('authorization')?.replace('Bearer ', '')}`,
      },
      body: JSON.stringify({
        walletId,
        bankAccountId,
        amount,
        reason,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Withdrawal failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
