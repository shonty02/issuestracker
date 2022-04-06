import pic from "../images/ninja-assassin-gaming.jpg"

const Home = () => {

    let age = 20;
    let user = {
        username: "super User",
        email: "user@gmail.com",
        password: '1234'
    };

    const addNums = (a,b) => {
        return a+b;

      
    };
    const myname = "shonty";

    const sqrt = (n) => {
        return n** (1/2);
    }

    const img1 ="https://thumbor.forbes.com/thumbor/711x473/https://specials-images.forbesimg.com/imageserve/6064b148afc9b47d022718d1/Hennessey-Venom-F5/960x0.jpg?fit=scale";

  

    const card = () => {
        return (
            <div className="card" style={{ width: "500px"}}>
                <img 
                className="card-img-top"
                src="https://images.pushsquare.com/4510c3977a7af/spyro-reignited-trilogy-how-to-switch-to-original-soundtrack-guide-ps4-playstation-4.large.jpg"
                />
                <div className="card-body">
                    <h1>spyro</h1>
                <img src={img1} alt=""/>    
                 
                <img src="logo512.png" alt=""/>
                <img src={pic} alt=""/>       

                </div>
            </div>
        );
    };

    

    return (

        <div>
            <h1>Home Component</h1>
            <h2> Age : {age}</h2>

            <h4>username: {user.username}</h4>
            <h4>email: {user.email}</h4>
            
            <h4>password: {user.password}</h4>
            <h3>{myname}</h3>
            <h3>{sqrt(12)}</h3>
            <h5>2 + 2 is {addNums(2, 2)}</h5>
            <button className="btn btn-primary">Hello theme</button>
            <button  color="success"
                  variant="contained" className="btn btn-primary">Hello theme</button>
            
            
            {card()}
            {card()}
            {card()}
        </div>
    );
};
export default Home;