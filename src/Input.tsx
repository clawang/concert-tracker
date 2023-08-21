import React from 'react';
import { useClassicState } from './hooks';

type InputDataType = {
    date: Date | null,
    name: string,
    venueName: string,
    venueCity: string,
    rating: number,
};

interface InputProps {
    handleInputSubmit: (date: Date, name: string, venueName: string, venueCity: string, rating: number) => void;
};

function Input({ handleInputSubmit }: InputProps) {
    const [inputData, setInputData] = useClassicState<InputDataType>({
        date: null,
        name: '',
        venueName: '',
        venueCity: '',
        rating: 0,
    });

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({ [event.currentTarget.name]: event.currentTarget.value });
    };

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (inputData.date && inputData.name && inputData.venueName && inputData.venueCity && inputData.rating !== null) {
            handleInputSubmit(inputData.date, inputData.name, inputData.venueName, inputData.venueCity, inputData.rating);
            setInputData({date: null,
                name: '',
                venueName: '',
                venueCity: '',
                rating: 0});
            const resetForm = event.target as HTMLFormElement;
            resetForm.reset();
        } else {
            alert('Not all fields are filled out!');
        }
    }

    return (
        <form className="input-form" onSubmit={onSubmit}>
            <label>
                Date<br/>
                <input type="date" name="date" onChange={onInputChange} />
            </label>
            <label>
                Name<br/>
                <input type="text" name="name" value={inputData.name} onChange={onInputChange} />
            </label>
            <label>
                Venue<br/>
                <input type="text" name="venueName" value={inputData.venueName} onChange={onInputChange} />
            </label>
            <label>
                City<br/>
                <input type="text" name="venueCity" value={inputData.venueCity} onChange={onInputChange} />
            </label>
            <label>
                Rating<br/>
                <input type="number" name="rating" min={0} max={5} step={0.1} value={inputData.rating} onChange={onInputChange} />
            </label>
            <input type="submit" />
        </form>
    );
}

export default Input;
