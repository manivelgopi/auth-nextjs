
export default function UserProfile({params}: any) {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between p-60'>
        <h1>Profile Page</h1>
      <hr/>

      <p className="test-4xl">Profile page : {params.id} </p>
      </div>
    </>
  )
}
