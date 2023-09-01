import Link from 'next/link'


export default function page() {
    // throw new Error("sd")
  return (
    <div>
        <p className='text-center mt-10'>About page</p>
        <Link href="/">Home</Link>
    </div>
  )
}
