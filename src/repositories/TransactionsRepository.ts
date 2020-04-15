import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allIncome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        const sum = total + transaction.value;
        return sum;
      }
      return total;
    }, 0);
    const allOutcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        const sum = total + transaction.value;
        return sum;
      }
      return total;
    }, 0);
    return {
      income: allIncome,
      outcome: allOutcome,
      total: allIncome - allOutcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
