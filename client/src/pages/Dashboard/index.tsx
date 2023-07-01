
const Dashboard = () => {
  const cookie=document.cookie;
  // console.log(cookie.jwtToken)
  cookie.split(';')
  console.log(cookie,"second")
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard 