import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";


function SelectionsSection() {

    const animals = ["parrot", "cat", "cow", "dog", "whale", "monkey", "human", "spider", "snake", "lizard", "buffallo", "goat"];

    const [choices, setChoices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function generatePairs(list) {
        if (list.length < 2) { return []; }
        var first = list[0],
            rest = list.slice(1),
            pairs = rest.map(function (x) { return [first, x]; });
        return pairs.concat(generatePairs(rest));
    }

    const shuffledAnimals = animals
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    const pairs = generatePairs(shuffledAnimals);
    const randomPairs = pairs.sort(() => .5 - Math.random()).slice(0, 5);

    const markChoice = (index, score) => {
        setChoices(current => [...current, [...randomPairs[index], score]]);
        setCurrentIndex(currentIndex + 1);
    }

    useEffect(() => {
        if (choices.length == 5) {
            choices.forEach((item, index) => {
                console.log(item);
                let names = [item[0], item[1]];
                let score = item[2];
                names.sort();
                let doc_id = names[0] + "_" + names[1];
                let docRef = db.collection('pairs').doc(doc_id);

                return docRef.update({
                    score: firebase.firestore.FieldValue.increment(score)
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                    docRef.set({
                        score: score
                    });
                });

                // const doc = docRef.get();
                // if (!doc.exists) {
                //     console.log("Document does not exist")
                //     docRef.set({
                //         score: score
                //     });
                // } else {
                //     console.log("Document exists")
                //     docRef.update({
                //         score: firebase.firestore.FieldValue.increment(score)
                //     });
                // }
            })
        }
    }, [choices]);

    return (
        <section className="container">
            {currentIndex < 5 ? (
                <>
                    How similar are:
                    <br /><br />
                    {randomPairs[currentIndex][0]} and  {randomPairs[currentIndex][1]}
                    <br /><br />
                    <button onClick={() => { markChoice(currentIndex, 2) }} key="vs" >Very Similar</button>
                    <button onClick={() => { markChoice(currentIndex, 1) }} key="ss" >Slightly Similar</button>
                    <button onClick={() => { markChoice(currentIndex, -1) }} key="sd" >Slightly Different</button>
                    <button onClick={() => { markChoice(currentIndex, -2) }} key="vd" >Very Different</button>
                </>
            ) : (
                <>
                    Well chosen!
                </>
            )}

        </section>
    );
}

export default SelectionsSection;
