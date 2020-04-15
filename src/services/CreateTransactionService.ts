import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionType } from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  static isTransactionType(type: string): type is TransactionType {
    return type === 'income' || type === 'outcome';
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!CreateTransactionService.isTransactionType(type)) {
      throw Error('Invalid type value');
    }
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('There is no valid value to do this operation');
    }

    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
