import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input name='name' defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.name && <span className="error">Name is required</span>} 

            <input name='email' defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.email && <span className="error">Email is required</span>}

            <input name='address' {...register("address", { required: true })} />
            {errors.address && <span className="error">Address is required</span>}
            
            <input type="submit" />
        </form>
    );
};

export default Shipment;