const express = require("express");
const {users} = require("./data/users.json")

const PORT = 8081;

const app = express();

app.use(express.json());

// Route: /users
// Method: Get
// Description: Get all users
// Access:Public
// Parameters:None

app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});

// Route: /users/:id
// Method: Get
// Description: Get user by id
// Access:Public
// Parameters:id

app.get("/users/:id", (req, res)=>{
    const {id} = req.params;
    console.log(req.params);
    const user = users.find((each)=>each.id===id)
    if(!user){
        return res.status(404).json({
            success: false,
            messaage:" User does not found",
        });
    }
    return res.status(200).json({
        success:true,
       message:"user found",
        data:user
    });
});

// Route: /users
// Method: Post
// Description: Creating users
// Access:Public
// Parameters:None

app.post("/users",(req,res)=>{
const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body
const user = users.find((each)=>each.id===id);
if(user){
    res.status(404).json({
        success:false,
        message: "User with this ID exists"
    });
}
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success:true,
       
        data : users
    })
});


// Route: /users/:id
// Method: Put
// Description: Update user by id
// Access:Public
// Parameters:id

app.put("/users/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    
    const user = users.find((each)=>each.id === id);
    if(!user){
    res.status(404).json({
        success:false,
        message: "User Doesn't Exist"
    });
}
    const updateUserData= users.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            }
        }
        return each;
    });
    return res.status(202).json({
        success:true,
        message: "User data updated" ,
        data: updateUserData
    })
});

// Route: /users/:id
// Method: Delete
// Description: Delete user by id
// Access:Public
// Parameters:id

app.delete("/users/:id",(req,res)=>[
    const user = users.find((each)=>each.id === id);
    if(!user){
    res.status(404).json({
        success:false,
        message: "User Doesn't Exist"
    });
}
    // building logic
])

app.get("/",(req, res)=>{
    res.status(200).json({
        "message":"Server is running",
        });
});

app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route doesn't exists"
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});