import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Board } from '../components/Board'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Board />
    </>
  )
}
