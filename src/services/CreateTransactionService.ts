import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    if (transaction.type.valueOf() === 'outcome') {
      if (transaction.value > balance.total) {
        throw Error('Valor outcome extrapolou o valor totoal.');
      }
    }

    return transaction;
  }
}

export default CreateTransactionService;
