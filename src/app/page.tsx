'use client';

import './globals.css';
import { Header } from '@/app/components/Header/Header.index';
import { Button } from '@/app/components/Button/Button.index';
import { useRef, useState } from 'react';
import { ListItem } from '@/app/components/ListItem/ListItem.index';
import Icons from '@/app/components/Icon/Icons.index';
import { FloatingMenu } from '@/app/components/FloatingMenu/FloatingMenu.index';
import {
  Music,
  Paperclip2,
  Trash,
  Image as ImageIcon,
  Video,
  Camera,
  Map as MapIcon,
  TextalignLeft,
  TextalignCenter,
  TextalignRight,
  TextalignJustifycenter,
  Text as TextIcon,
  Paintbucket,
  Calendar1,
  Code,
  Send2,
  Calculator,
  Printer,
  TickCircle,
  More,
  Microphone,
  EmojiNormal,
  EmojiHappy,
  TextBold,
  TextItalic,
  TextUnderline,
  ArrowUp2,
  ArrowDown2,
} from 'iconsax-react';
import { Collapse } from '@mui/material';

type noteType = {
  label: string;
  clicked: boolean;
  content: string;
};

// const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

export default function Home() {
  // initial arrays
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

  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 48, 56, 64, 72];

  const fontColors = [
    '#fecaca',
    '#fecdd3',
    '#fbcfe8',
    '#f5d0fe',
    '#e9d5ff',
    '#ddd6fe',
    '#c7d2fe',
    '#bfdbfe',
    '#bae6fd',
    '#a5f3fc',
    '#99f6e4',
    '#a7f3d0',
    '#bbf7d0',
    '#d9f99d',
    '#fef08a',
    '#fde68a',
    '#fed7aa',
    '#e7e5e4',
    '#e5e7eb',
    '#e2e8f0',
  ];

  let attachMenuTimeout: any;
  let alignMenuTimeout: any;
  let fontDetailsMenuTimeout: any;
  let fontColorMenuTimeout: any;

  // general states
  const [notes, setNotes] = useState<Array<noteType>>(initialNotes);
  const [inputText, setInputText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [showNote, setShowNote] = useState<boolean>(true);
  const [openFooter, setOpenFooter] = useState<boolean>(false);

  // font details states
  const [fontColor, setFontColor] = useState<string>('#a7f3d0');
  const [fontSize, setFontSize] = useState<number>(fontSizes[6]);
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(6);
  const [fontBold, setFontBold] = useState<boolean>(false);
  const [fontItalic, setFontItalic] = useState<boolean>(false);
  const [fontUnderline, setFontUnderline] = useState<boolean>(false);

  // show menu states
  const [showAttachMenu, setShowAttachMenu] = useState<boolean>(false);
  const [showAlignMenu, setShowAlignMenu] = useState<boolean>(false);
  const [showFontColorMenu, setShowFontColorMenu] = useState<boolean>(false);
  const [showFontDetailsMenu, setShowFontDetailsMenu] = useState<boolean>(false);

  // references
  const footerRef = useRef(null);
  const showingMenu = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // functions and methods

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

  // item renderers

  const colorItem = (color: string) => {
    return (
      <div
        onClick={() => {
          setFontColor(color);
        }}
        className={'p-2'}>
        <div className={`rounded-md h-6 w-6`} style={{ backgroundColor: color }} />
      </div>
    );
  };

  // main

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
              outlined={true}
              label={'new note'}
              icon={<Icons name={'DocPlus'} color={'#d1fae5'} />}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
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
              className={'w-full border-2 border-cyan-900 rounded-2xl flex flex-row'}
              style={{
                maxHeight: screenHeight * 0.85,
              }}>
              <div className={'w-full flex flex-col'}>
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
                    'h-16 w-full py-5 px-5 bg-transparent cursor-text placeholder:text-teal-600 text-teal-500'
                  }
                />

                <textarea
                  value={inputText}
                  onChange={(event) => {
                    setInputText(event.target.value);
                  }}
                  ref={inputRef}
                  style={{
                    fontSize: fontSize,
                    fontWeight: fontBold ? 'bold' : '',
                    fontStyle: fontItalic ? 'italic' : '',
                    textDecoration: fontUnderline ? 'underline' : '',
                    caretColor: '#307F69',
                    outline: 'none',
                    color: fontColor,
                  }}
                  placeholder={" What's on your mind?"}
                  className={`bg-transparent h-full w-full p-3 cursor-text placeholder:text-emerald-500 border-2 border-transparent border-t-cyan-900`}
                />

                <div
                  ref={footerRef}
                  className={`h-16 py-5 pl-2 flex items-center justify-between w-full border-2 border-transparent border-t-cyan-900 transition-all ${openFooter ? 'h-96' : 'h-16'}`}>
                  <Button
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setOpenFooter(!openFooter);
                    }}
                    icon={
                      !openFooter ? (
                        <EmojiNormal size={30} color='#ecfdf8' variant='Bold' />
                      ) : (
                        <EmojiHappy size={30} color='#fcd34d' variant='Bold' />
                      )
                    }
                  />
                  <Collapse
                    in={!openFooter}
                    style={{ display: openFooter ? 'none' : 'flex' }}
                    orientation={'horizontal'}
                    timeout={500}>
                    <div className={'w-12'}>
                      <Microphone color='#ffffee' />
                    </div>
                  </Collapse>
                </div>
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
                  <Trash size='24' color='#ffffee' variant='Outline' />
                </div>

                <Button
                  onClick={() => {}}
                  onHoverIn={() => {
                    clearTimeout(attachMenuTimeout);
                    setShowAttachMenu(true);

                    setShowAlignMenu(false);
                    setShowFontDetailsMenu(false);
                    setShowFontColorMenu(false);
                  }}
                  onHoverOut={() => {
                    attachMenuTimeout = setTimeout(() => {
                      if (!showingMenu.current) {
                        setShowAttachMenu(false);
                      }
                    }, 1000);
                  }}
                  icon={<Paperclip2 size='24' color='#ffffee' variant='Outline' />}
                />
                {showAttachMenu && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 180,
                      right: 115,
                    }}>
                    <FloatingMenu
                      showMenu={showAttachMenu}
                      onHoverIn={() => {
                        clearTimeout(attachMenuTimeout);
                        showingMenu.current = true;
                      }}
                      onHoverOut={() => {
                        showingMenu.current = false;
                        attachMenuTimeout = setTimeout(() => {
                          setShowAttachMenu(false);
                        }, 500);
                      }}
                      items={[
                        <Button
                          key={1}
                          onClick={() => {}}
                          icon={<Music size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={2}
                          onClick={() => {}}
                          icon={<ImageIcon size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={3}
                          onClick={() => {}}
                          icon={<Video size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={4}
                          onClick={() => {}}
                          icon={<Camera size='24' color='#ffffee' variant='Outline' />}
                        />,
                      ]}
                    />
                  </div>
                )}

                <Button
                  onClick={() => {}}
                  onHoverIn={() => {
                    clearTimeout(alignMenuTimeout);
                    setShowAlignMenu(true);

                    setShowAttachMenu(false);
                    setShowFontDetailsMenu(false);
                    setShowFontColorMenu(false);
                  }}
                  onHoverOut={() => {
                    alignMenuTimeout = setTimeout(() => {
                      if (!showingMenu.current) {
                        setShowAlignMenu(false);
                      }
                    }, 1000);
                  }}
                  icon={<TextalignLeft size='24' color='#ffffee' variant='Outline' />}
                />
                {showAlignMenu && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 237.5,
                      right: 115,
                    }}>
                    <FloatingMenu
                      showMenu={showAlignMenu}
                      onHoverIn={() => {
                        clearTimeout(alignMenuTimeout);
                        showingMenu.current = true;
                      }}
                      onHoverOut={() => {
                        showingMenu.current = true;
                        alignMenuTimeout = setTimeout(() => {
                          setShowAlignMenu(false);
                        }, 500);
                      }}
                      items={[
                        <Button
                          key={1}
                          onClick={() => {}}
                          icon={<TextalignLeft size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={2}
                          onClick={() => {}}
                          icon={<TextalignCenter size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={3}
                          onClick={() => {}}
                          icon={<TextalignRight size='24' color='#ffffee' variant='Outline' />}
                        />,
                        <Button
                          key={4}
                          onClick={() => {}}
                          icon={
                            <TextalignJustifycenter size='24' color='#ffffee' variant='Outline' />
                          }
                        />,
                      ]}
                    />
                  </div>
                )}

                <Button
                  onClick={() => {}}
                  onHoverIn={() => {
                    clearTimeout(fontDetailsMenuTimeout);
                    setShowFontDetailsMenu(true);

                    setShowAttachMenu(false);
                    setShowAlignMenu(false);
                    setShowFontColorMenu(false);
                  }}
                  onHoverOut={() => {
                    fontDetailsMenuTimeout = setTimeout(() => {
                      if (!showingMenu.current) {
                        setShowFontDetailsMenu(false);
                      }
                    }, 1000);
                  }}
                  icon={<TextIcon size='24' color='#ffffee' variant='Outline' />}
                />
                {showFontDetailsMenu && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 295,
                      right: 115,
                    }}>
                    <FloatingMenu
                      showMenu={showFontDetailsMenu}
                      onHoverIn={() => {
                        clearTimeout(fontDetailsMenuTimeout);
                        showingMenu.current = true;
                      }}
                      onHoverOut={() => {
                        showingMenu.current = true;
                        fontDetailsMenuTimeout = setTimeout(() => {
                          setShowFontDetailsMenu(false);
                        }, 500);
                      }}
                      items={[
                        <Button
                          key={1}
                          disabled={fontSizeIndex === fontSizes.length - 1}
                          onClick={() => {
                            if (fontSizeIndex < fontSizes.length - 1) {
                              setFontSizeIndex(fontSizeIndex + 1);
                              setFontSize(fontSizes[fontSizeIndex + 1]);
                            }
                          }}
                          icon={
                            <ArrowUp2
                              size='24'
                              color={
                                !(fontSizeIndex >= fontSizes.length - 1) ? '#ffffee' : '#737373'
                              }
                              variant='Outline'
                            />
                          }
                        />,
                        <p
                          key={6}
                          style={{
                            fontSize: 28,
                          }}>
                          A
                          <span
                            style={{
                              fontSize: 20,
                              marginLeft: 2,
                            }}>
                            A
                          </span>
                        </p>,
                        <Button
                          key={2}
                          disabled={fontSizeIndex === 0}
                          onClick={() => {
                            if (fontSizeIndex > 0) {
                              setFontSizeIndex(fontSizeIndex - 1);
                              setFontSize(fontSizes[fontSizeIndex - 1]);
                            }
                          }}
                          icon={
                            <ArrowDown2
                              size='24'
                              color={!(fontSizeIndex <= 0) ? '#ffffee' : '#737373'}
                              variant='Outline'
                            />
                          }
                        />,
                        <Button
                          key={3}
                          onClick={() => {
                            setFontBold(!fontBold);
                          }}
                          icon={
                            <TextBold
                              size='24'
                              color='#ffffee'
                              variant={fontBold ? 'Bold' : 'Outline'}
                            />
                          }
                        />,
                        <Button
                          key={4}
                          onClick={() => {
                            setFontItalic(!fontItalic);
                          }}
                          icon={
                            <TextItalic
                              size='24'
                              color='#ffffee'
                              variant={fontItalic ? 'Bold' : 'Outline'}
                            />
                          }
                        />,
                        <Button
                          key={5}
                          onClick={() => {
                            setFontUnderline(!fontUnderline);
                          }}
                          icon={
                            <TextUnderline
                              size='24'
                              color='#ffffee'
                              variant={fontUnderline ? 'Bold' : 'Outline'}
                            />
                          }
                        />,
                      ]}
                    />
                  </div>
                )}

                <Button
                  onClick={() => {}}
                  onHoverIn={() => {
                    clearTimeout(fontColorMenuTimeout);
                    setShowFontColorMenu(true);

                    setShowAttachMenu(false);
                    setShowAlignMenu(false);
                    setShowFontDetailsMenu(false);
                  }}
                  onHoverOut={() => {
                    fontColorMenuTimeout = setTimeout(() => {
                      if (!showingMenu.current) {
                        setShowFontColorMenu(false);
                      }
                    }, 1000);
                  }}
                  icon={<Paintbucket size='24' color={fontColor} variant='Outline' />}
                />
                {showFontColorMenu && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 352.5,
                      right: 115,
                    }}>
                    <FloatingMenu
                      showMenu={showFontColorMenu}
                      onHoverIn={() => {
                        clearTimeout(fontColorMenuTimeout);
                        showingMenu.current = true;
                      }}
                      onHoverOut={() => {
                        showingMenu.current = true;
                        fontColorMenuTimeout = setTimeout(() => {
                          setShowFontColorMenu(false);
                        }, 500);
                      }}
                      items={fontColors.map((color) => {
                        return colorItem(color);
                      })}
                    />
                  </div>
                )}

                <Button
                  onClick={() => {}}
                  icon={
                    <div style={{ transform: `rotate(90deg)` }}>
                      <More size='24' color='#ffffee' />
                    </div>
                  }
                />
                <Button
                  onClick={() => {}}
                  icon={<Calendar1 size='24' color='#ffffee' variant='Outline' />}
                />
                <Button
                  onClick={() => {}}
                  icon={<MapIcon size='24' color='#ffffee' variant='Outline' />}
                />
                <Button
                  onClick={() => {}}
                  icon={<Code size='24' color='#ffffee' variant='Outline' />}
                />
                <Button
                  onClick={() => {}}
                  icon={<Send2 size='24' color='#ffffee' variant='Outline' />}
                />
                <Button
                  onClick={() => {}}
                  icon={<Calculator size='24' color='#ffffee' variant='Outline' />}
                />
                <Button
                  onClick={() => {}}
                  icon={<Printer size='24' color='#ffffee' variant='Outline' />}
                />
                <div
                  onClick={handleSubmitNote}
                  className={
                    'h-16 w-full flex justify-center items-center border-2 border-transparent border-b-cyan-900 bg-green-600 rounded-br-xl'
                  }>
                  <TickCircle size='32' color='#ffffee' variant='Outline' />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
