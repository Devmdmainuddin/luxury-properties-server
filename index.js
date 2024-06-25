const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000



app.use(cors());
app.use(express.json());




// const property = (
//     [
//         {
//             "id": 1,
//             "category": "Single Family Home",
//             "image": "https://i.ibb.co/3MsyzN0/home.jpg",
//             "title": "Spacious Family Retreat",
//             "segment_name": "Luxury",
//             "description": "This luxurious single-family home offers spacious living areas, perfect for families. Enjoy the tranquility of suburban living with convenient access to urban amenities.",
//             "price": 950000,
//             "status": "For Sale",
//             "area": "4000 sqft",
//             "location": "1234 Elm Street, Cityville, USA",
//             "facilities": ["Swimming Pool", "Garden", "Gym", "Garage"]
//         },
//         {
//             "id": 2,
//             "category": "Townhouse",
//             "image": "https://i.ibb.co/Ws8TQt0/banner-4.jpg",
//             "title": "Modern Townhouse Living",
//             "segment_name": "Mid-range",
//             "description": "This contemporary townhouse offers modern living in a vibrant neighborhood. With sleek design and urban convenience, it's perfect for young professionals.",
//             "price": 450000,
//             "status": "For Sale",
//             "area": "2200 sqft",
//             "location": "5678 Maple Avenue, Townville, USA",
//             "facilities": ["Community Pool", "Playground", "Fitness Center"]
//         },
//         {
//             "id": 3,
//             "category": "Apartment",
//             "image": "https://i.ibb.co/FbH7MCT/apartment-1.jpg",
//             "title": "City Living at its Finest",
//             "segment_name": "Urban",
//             "description": "Experience the excitement of city living in this modern apartment. With stunning views and convenient access to downtown, it offers the ultimate urban lifestyle.",
//             "price": 3000,
//             "status": "For Rent",
//             "area": "1000 sqft",
//             "location": "7890 Oak Lane, Metropolis",
//             "facilities": ["Concierge Service", "Roof Deck", "Pet-Friendly"]
//         },
//         {
//             "id": 4,
//             "category": "Student Housing",
//             "image": "https://i.ibb.co/rwNs2qG/pexels-thgusstavo-santana-2102587.jpg",
//             "title": "Student Community Living",
//             "segment_name": "Budget",
//             "description": "Join a vibrant student community in this affordable housing complex. With shared amenities and a prime location near campus, it's ideal for student life.",
//             "price": 600,
//             "status": "For Rent",
//             "area": "250 sqft (per room)",
//             "location": "1011 Cedar Street, Collegville",
//             "facilities": ["Study Rooms", "Laundry Facilities", "Wi-Fi"]
//         },
//         {
//             "id": 5,
//             "category": "Senior Living Community",
//             "image": "https://i.ibb.co/y5Kdqmp/Senior-Living.jpg",
//             "title": "Retirement Oasis",
//             "segment_name": "Senior",
//             "description": "Discover a peaceful retirement oasis in this senior living community. With resort-style amenities and a vibrant social scene, it's perfect for active seniors.",
//             "price": 4000,
//             "status": "For Rent",
//             "area": "1500 sqft",
//             "location": "1313 Pine Drive, Seniorville, USA",
//             "facilities": ["Senior Activities", "Restaurant", "Wellness Center"]
//         },
//         {
//             "id": 6,
//             "category": "Vacation Rental",
//             "image": "https://i.ibb.co/5csmgkB/vacation-2.jpg",
//             "title": "Seaside Escape",
//             "segment_name": "Luxury",
//             "description": "Escape to this luxurious seaside villa for a memorable vacation. With breathtaking ocean views and private beach access, it's the ultimate getaway destination.",
//             "price": 5000,
//             "status": "For Rent",
//             "area": "3000 sqft",
//             "location": "1515 Beach Road, Paradise Island",
//             "facilities": ["Private Beach Access", "Infinity Pool", "Hot Tub"]
//         },
//         {
//             "id": 7,
//             "category": "Single Family Home",
//             "image": "https://i.ibb.co/4dR207m/banner-2.jpg",
//             "title": "Classic Family Residence",
//             "segment_name": "Mid-range",
//             "description": "This classic single-family home offers comfort and charm in a family-friendly neighborhood. With a spacious backyard and cozy interiors, it's perfect for family living.",
//             "price": 550000,
//             "status": "For Sale",
//             "area": "2800 sqft",
//             "location": "1717 Willow Lane, Suburbia, USA",
//             "facilities": ["Backyard", "Fireplace", "Home Office"]
//         },
//         {
//             "id": 8,
//             "category": "Apartment",
//             "image": "https://i.ibb.co/zFQrxsP/apartment.jpg",
//             "title": "Urban Loft Living",
//             "segment_name": "Urban",
//             "description": "Live in style in this urban loft apartment. With industrial-chic design and trendy amenities, it's perfect for those seeking an edgy urban lifestyle.",
//             "price": 2800,
//             "status": "For Rent",
//             "area": "1200 sqft",
//             "location": "1818 Artist Avenue, Creativityville",
//             "facilities": ["Exposed Brick Walls", "Rooftop Terrace", "Fitness Center"]
//         },
//         {
//             "id": 9,
//             "category": "Townhouse",
//             "image": "https://i.ibb.co/rF2ZZGW/banner-3.jpg",
//             "title": "Luxury Townhouse Retreat",
//             "segment_name": "Luxury",
//             "description": "Indulge in luxury living in this exquisite townhouse retreat. With upscale finishes and private amenities, it offers the epitome of urban sophistication.",
//             "price": 750000,
//             "status": "For Sale",
//             "area": "3500 sqft",
//             "location": "1919 Skyline Drive, Skyview Heights",
//             "facilities": ["Private Patio", "Wine Cellar", "Smart Home Technology"]
//         }

//     ]
// )



const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.jgwprpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const propertycollection = client.db("properties").collection("propertie")
        const propertiesUsers = client.db("properties").collection("users")

        app.get('/propertie', async (req, res) => {
            const carsor = propertycollection.find();
            const result = await carsor.toArray();
            res.send(result)
        })

        app.get('/propertie/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertycollection.findOne(query)
            res.send(result);
        })

        app.post('/propertie',async(req,res)=>{
            const properte = req.body;
            console.log('properties',properte)
            const result = await propertycollection.insertOne(properte)
            res.send(result);
        })
        app.put('/propertie/:id', async (req, res) => {
            const id = req.params.id;
            const properte = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateproperte = {
                $set: {
                    category:properte.category,
                    image:properte.image,
                    title:properte.title,
                    segment_name:properte.segment_name,
                    description:properte.description,
                    price:properte.price,
                    status:properte.status,
                    area:properte.area,
                    location:properte.location,
                    
                }
            };
            const result = await propertycollection.updateOne(filter, updateproperte, options);
            console.log(properte)
            res.send(result);
        })

        app.delete('/propertie/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertycollection.deleteOne(query)
            res.send(result);
            console.log('delete', id)
        })

        // ............................

        app.get('/users', async (req, res) => {
            const carsor = propertiesUsers.find();
            const result = await carsor.toArray();
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertiesUsers.findOne(query)
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await propertiesUsers.insertOne(user);
            res.send(result);
        });
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const users = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateuser = {
                $set: {
                    // name: users.fullName,
                    // image:users.image,
                    email: users.email,
                    createdAt:users.createdAt
                }
            };
            const result = await propertiesUsers.updateOne(filter, updateuser, options);
            console.log(users)
            res.send(result);
        })


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertiesUsers.deleteOne(query)
            res.send(result);
            console.log('delete', id)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// const usercollection = client.db("users").collection("user")
app.get('/', (req, res) => {
    res.send()
})

// app.get('/', async(req, res) => {
//     const carsor = usercollection.find();
//     const result = await carsor.toArray();
//     res.send(property)
//   })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})