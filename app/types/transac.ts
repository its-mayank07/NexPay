interface RampTransaction {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }
  
  interface P2PTransaction {
    time: Date;
    amount: number;
    from: string;
    to: string;
    fromUserNumber: string;
  }

  export type { RampTransaction, P2PTransaction };