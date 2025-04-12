'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import ApolloWrapper from './ApolloProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloWrapper>{children}</ApolloWrapper>
    </Provider>
  );
}