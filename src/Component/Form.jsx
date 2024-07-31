import React,{useEffect, useState} from 'react'

function Form({onSubmit,initialData,onCancel}) {
    const [panNumber, setPanNumber] = useState(initialData?.panNumber || '')
    const [fullName, setFullName] = useState(initialData?.fullName || '')
    const [email, setEmail] = useState(initialData?.email || '')
    const [mobileNumber, setMobileNumber] = useState(initialData?.mobileNumber || '')
    const [addresses, setAddresses] = useState(initialData?.addresses || [{line1: '',line2: '',postcode: '',state:'',city:''}]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
      if(panNumber.length===10){
        setLoading(true);
        fetch('http://lab.pixel6.co/api/verify-pan.php',{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({ panNumber}),
        })
        .then(res=> res.json())
        .then(data=>{
          if(data.isValid){
            setFullName(data.fullName);
          }
        })
        .catch(err => console.error(err))
        .finally(()=> setLoading(false));
      }
    },[panNumber]);

    const handleAddressChange=(index,field,value)=>{
      const newAddresses=[...addresses];
      newAddresses[index][field]=value;
      setAddresses(newAddresses);

      if(field==='postcode' && value.length===6){
        setLoading(true);
        fetch('http://lab.pixel6.co/api/get-postcode-details.php',{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({postcode:value})
        })
        .then(res=>res.json())
        .then(data=>{
          newAddresses[index].city=data.city[0].name;
          newAddresses[index].state=data.state[0].name;
          setAddresses(newAddresses);
        })
        .catch(err=> console.error(err))
        .finally(()=>setLoading(false));
      }
    };
    
    const handleAddAddress = () => {
      if (addresses.length < 10) {
        setAddresses([...addresses, { addressLine1: '', addressLine2: '', postcode: '', city: '', state: '' }]);
      }
    };
    const HandleForm=(e)=>{
      e.preventDefault();
      const newUser={panNumber,fullName,email,mobileNumber,addresses}
      onSubmit(newUser);
    };


  return (
    <form onSubmit={HandleForm}>
      <div>
      <label>PAN</label><br />
      <input type="text" value={panNumber} placeholder="PAN Number." maxLength="10" pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}" title="Please enter valid PAN number. E.g. AAAAA9999A"  onChange={(e)=>setPanNumber(e.target.value)} required/><br />
      {loading && <span>Loading...</span>}
      </div>
      <div>
      <label htmlFor="">Full Name</label><br />
      <input type="text" value={fullName} maxLength={140} placeholder='Enter Your Full Name' onChange={(e)=>setFullName(e.target.value)} required/><br />
      </div>
      <div>
      <label htmlFor="">Email</label><br />
      <input type="text" value={email} placeholder='Enter Your Email' maxLength={255} onChange={(e)=>setEmail(e.target.value)} required/><br />
      </div>
      <div><label htmlFor="">Mobile Number</label><br />
      <input type="text" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} placeholder='Enter 10 Digit Mobile Number' maxLength={10}  required/><br />
      </div>
      <div>
        <label htmlFor="">Address:</label>
        {addresses.map((address,index)=>{
          return(
          <div key={index}>
            <input className='address' type="text" placeholder='Address Line 1' value={address.line1} onChange={(e)=>handleAddressChange(index,'line1',e.target.value)} required />
            <input className='address' type="text" placeholder='Address Line 2' value={address.line2} onChange={(e)=>handleAddressChange(index,'line2',e.target.value)} />
            <input className='address' type="text" placeholder='Postcode' value={address.postcode} onChange={(e)=>handleAddressChange(index,'postcode',e.target.value)} maxLength={6}required/>
            <select value={address.state} disabled>
              <option value="">{address.state}</option>
            </select>
            <select value={address.city}disabled>
              <option value="">{address.city}</option>
            </select>
          </div>
          )
        })}
        {addresses.length < 10 && <button type="button" onClick={handleAddAddress}>Add Address</button>}   
      </div>

      <button type='submit' >Submit</button>
      <button type='button' onClick={onCancel}>Cancel</button>
      </form>

  )
}


export default Form
