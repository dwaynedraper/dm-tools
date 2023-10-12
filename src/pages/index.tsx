import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/Dashboard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <Dashboard></Dashboard>
    </Layout>
  );
}
