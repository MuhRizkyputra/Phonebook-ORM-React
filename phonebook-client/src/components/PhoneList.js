import PhoneItem from "./PhoneItem";

export default function Phonelist ({item , setItem, UpdateData, Delete}) {
    return (
        <div className="phonelist">
            {item.map((user)=> {
               return <PhoneItem key={user.id} UpdateData={UpdateData} item={item} user={user} setItem={setItem}  Delete={Delete}/>
            }
            )}
            
        </div>
    )
}
