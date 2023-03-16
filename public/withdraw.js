function Withdraw(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
    const [message, setMessage] = React.useState('outer default message');
    const {ctx,setCtx}                = React.useContext(UserContext);
  
    return (
      <Card
        bgcolor="secondary"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
          <WithdrawMsg setShow={setShow} setStatus={setStatus} message={message}/>}
      />
    )
  }
  
  function WithdrawMsg(props){
    return(<>
      <h5>{props.message}</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Withdraw Again
      </button>
  
    </>);
  }
  
  function WithdrawForm(props) {
  const [email, setEmail]           = React.useState('');
  const [password, setPassword]     = React.useState('');
  const [balance, setBalance]       = React.useState('');
  const [data, setData]             = React.useState('');
  const {ctx,setCtx}                = React.useContext(UserContext);
  //console.table(ctx)

  function handle(){
    console.log(email, balance);
    const url = `/account/withdraw/${email}/${balance}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let message = data.message;
        props.setMessage(message);
        console.log('data = ' + data);
        console.log(message);
        console.log(data.isSuccess);
        console.table(data.user);
        //if the  result is a success, set the current user context to the returned user
        if (data.isSuccess){
          setCtx(data.user);
        }
  });

      props.setStatus('');
      props.setShow(false);
  }

  return(<>
    {/* User: {ctx.name} <br/>
    Current Balance: ${Number(ctx.balance)}<br/> */}
  
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Amount to Withdraw<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        onChange={e => setBalance(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Withdraw
      </button>
  
    </>);
  }