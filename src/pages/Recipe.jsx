import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

function Recipe() {
    const [recipe, setRecipe] = useState({});
    let params = useParams();
    const [active, setActive] = useState('instructions');

    const getRecipe = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const details = await data.json();
        setRecipe(details);
    };

    useEffect(() => {
        getRecipe();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title}/>
            </div>
            <Info>
                <div className='buttons'>
                    <Button 
                        className={active === 'instructions' ? 'active' : ''} 
                        onClick={() => setActive('instructions')}
                    >
                        Instructions
                    </Button>
                    <Button 
                        className={active === 'ingredients' ? 'active' : ''} 
                        onClick={() => setActive('ingredients')}
                    >
                        Ingredients
                    </Button>
                </div>
                {active === 'instructions' && 
                (<div className='info'>
                    <h3 dangerouslySetInnerHTML={{__html: recipe.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html: recipe.instructions}}></h3>
                </div>)}
                {active === 'ingredients' &&
                (<ul>
                    {recipe.extendedIngredients.map(item => {
                        return (
                            <li key={item.id}>{item.original}</li>
                        );
                    })}
                </ul>)}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
    }

    li {
        font-size: 1rem;
        line-height: 2.5rem;
        font-weight: 500;
    }

    ul {
        margin-top: 2rem;
        margin-left: 1rem;
    }

    img {
        width: 100%;
        border-radius: 2rem;
    }

    h3 {
        font-size: 1rem;
        line-height: 1.5rem;
    }

    div {
        width: 50%;
    }
`;

const Button = styled.button`
    height: max-content;
    padding: 1rem 3rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    border-radius: 0.7rem;
`;

const Info = styled.div`
    margin-left: 6rem;
    display: flex;
    flex-direction: column;

    .buttons {
        display: flex;
    }

    .info {
        width: 100%;
    }
`;

export default Recipe;