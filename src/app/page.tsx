'use client';

import './globals.css';
import { Header } from '@/app/components/Header/Header.index';
import { Button } from '@/app/components/Button/Button.index';
import { useRef, useState } from 'react';
import { ListItem } from '@/app/components/ListItem/ListItem.index';

type noteType = {
  label: string;
  clicked: boolean;
  content: string;
};

// const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

export default function Home() {
  const initialNotes: Array<noteType> = [
    {
      label: 'Meeting Agenda',
      clicked: false,
      content:
        'Discuss quarterly performance metrics.\nReview upcoming project deadlines.\nBrainstorm ideas for improving team collaboration.',
    },
    {
      label: 'Shopping List',
      clicked: false,
      content: 'Milk\nEggs\nBread\nApples\nChicken\nPasta\nSpinach\nToothpaste',
    },
    {
      label: 'Project Deadline',
      clicked: false,
      content:
        'Finalizing the design mockups by Friday.\nCompleting the front-end development by the end of next week.\nConducting user testing sessions by the following Monday.\nImplementing any necessary revisions based on user feedback.\nLaunching the project by the end of the month.',
    },
    {
      label: 'Travel Itinerary',
      clicked: false,
      content:
        "Destination: Paris, France\nDates: August 15th - August 22nd\nAccommodation: Hotel Le Marais\nSightseeing: Eiffel Tower, Louvre Museum, Notre-Dame Cathedral\nDining: Le Grand Véfour, Bistrot Paul Bert, Chez l'Ami Jean\nTransportation: Eurostar train from London to Paris",
    },
    {
      label: 'Recipe Ideas',
      clicked: false,
      content:
        'Chicken Alfredo Pasta\nVegetable Stir-Fry\nGrilled Salmon with Asparagus\nMargherita Pizza\nBeef Tacos with Guacamole\nCaesar Salad with Homemade Dressing',
    },
    {
      label: 'Fitness Goals',
      clicked: false,
      content:
        'Run 5 kilometers three times a week.\nAttend yoga class every Saturday morning.\nIncrease weightlifting reps by 10% within the next month.\nMaintain a balanced diet with plenty of fruits and vegetables.\nStay hydrated by drinking at least 8 glasses of water per day.',
    },
    {
      label: 'Book Recommendations',
      clicked: false,
      content:
        'The Great Gatsby by F. Scott Fitzgerald\nTo Kill a Mockingbird by Harper Lee\n1984 by George Orwell\nPride and Prejudice by Jane Austen\nThe Catcher in the Rye by J.D. Salinger\nThe Hobbit by J.R.R. Tolkien',
    },
    {
      label: 'Daily Journal',
      clicked: false,
      content:
        "Today's mood: Productive and focused.\nTasks completed: Reviewed project proposal, attended team meeting, completed coding tasks.\nHighlights of the day: Received positive feedback from the client, enjoyed lunch with colleagues.\nGoals for tomorrow: Start working on the presentation slides, schedule a brainstorming session with the team.",
    },
  ];

  const [notes, setNotes] = useState<Array<noteType>>(initialNotes);
  const [showNote, setShowNote] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleItemClick = (clickedIndex: number) => {
    setInputText(notes[clickedIndex]?.content ? notes[clickedIndex].content : '');

    setShowNote(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }

    let temp = notes.map((note, index) => {
      if (index === clickedIndex) {
        return { ...note, clicked: true };
      } else {
        return { ...note, clicked: false };
      }
    });
    setNotes(temp);
  };

  const handelNewNoteClicked = () => {
    let temp: Array<noteType> = notes.map((note) => {
      return { ...note, clicked: false };
    });

    let newNote: noteType = {
      label: `New Note ${notes.length}`,
      clicked: true,
      content: '',
    };

    temp.push(newNote);

    setNotes(temp);
    setShowNote(true);
    setInputText('');
  };

  const handleDeleteNote = () => {
    let temp = [...notes].filter((note) => !note.clicked);
    setShowNote(false);
    setNotes(temp);
  };

  const handleSubmitNote = () => {
    let temp = [...notes];
    const activeNote = temp.findIndex((note) => note.clicked);
    let noteInProcess = temp[activeNote];
    noteInProcess.label = title;
    noteInProcess.content = inputText;
    noteInProcess.clicked = false;
    temp[activeNote] = noteInProcess;
    setNotes(temp);
    setShowNote(false);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Header />
      <div className='px-8 py-3 mb-1 mt-24 flex flex-row w-full flex-1 justify-between'>
        <div
          className={'w-4/12 rounded-xl border-2 border-cyan-950 flex-col overflow-auto'}
          style={{
            maxHeight: screenHeight * 0.85,
          }}>
          <div className={'p-5'}>
            <Button
              onClick={handelNewNoteClicked}
              label={'new note'}
              style={{ width: '100%', justifyContent: 'flex-end' }}
            />
          </div>
          <div className={'mb-5'}>
            {notes.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  label={item.label}
                  onClick={() => {
                    handleItemClick(index);
                  }}
                  clicked={item.clicked}
                />
              );
            })}
          </div>
        </div>

        <div className={'w-8/12 pl-5 flex flex-1'}>
          {showNote && (
            <div
              className={
                'w-full border-2 border-cyan-900 rounded-2xl rounded-tl-none flex flex-row'
              }
              style={{
                maxHeight: screenHeight * 0.85,
              }}>
              <div className={'w-full'}>
                <input
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  placeholder={'title'}
                  style={{
                    fontSize: 24,
                    caretColor: '#307F69',
                    outline: 'none',
                  }}
                  className={
                    'h-16 w-full px-5 bg-transparent cursor-text placeholder:text-teal-600 text-teal-500'
                  }
                />
                <textarea
                  value={inputText}
                  onChange={(event) => {
                    setInputText(event.target.value);
                  }}
                  ref={inputRef}
                  style={{
                    fontSize: 18,
                    caretColor: '#307F69',
                    outline: 'none',
                    maxHeight: screenHeight * 0.76,
                  }}
                  placeholder={" What's on your mind?"}
                  className={
                    'bg-transparent h-full w-full p-3 cursor-text placeholder:text-emerald-500 text-emerald-100 border-2 border-transparent border-t-cyan-900'
                  }
                />
              </div>
              <div
                className={
                  'w-20 border-2 border-cyan-900 border-r-0 border-b-0 border-t-0 flex flex-col items-center justify-between cursor-pointer'
                }>
                <div
                  onClick={handleDeleteNote}
                  className={
                    'h-16 w-full flex justify-center items-center border-2 border-transparent border-b-cyan-900 bg-red-400 rounded-tr-xl'
                  }>
                  <p>Delete</p>
                </div>
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <Button onClick={() => {}} label={'%'} style={{ borderBottomRightRadius: 15 }} />
                <div
                  onClick={handleSubmitNote}
                  className={
                    'h-16 w-full flex justify-center items-center border-2 border-transparent border-b-cyan-900 bg-green-600 rounded-br-xl'
                  }>
                  <p>Submit</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*<a*/}
        {/*  href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'*/}
        {/*  className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-yellow-50-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'*/}
        {/*  target='_blank'*/}
        {/*  rel='noopener noreferrer'>*/}
        {/*  <h2 className={`mb-3 text-2xl font-semibold`}>*/}
        {/*    Docs <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>-&gt;</span>*/}
        {/*  </h2>*/}
        {/*  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Find in-depth information about Next.js features and API.</p>*/}
        {/*</a>*/}
      </div>
    </main>
  );
}
