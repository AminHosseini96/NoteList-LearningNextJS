'use client';

import './globals.css';
import { Header } from '@/app/components/Header/Header.index';
import { Button } from '@/app/components/Button/Button.index';
import { useState } from 'react';
import { ListItem } from '@/app/components/ListItem/ListItem.index';

export default function Home() {
  const [newNote, setNewNote] = useState(false);
  const [inputText, setInputText] = useState('');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Header />
      <div className='px-8 py-8 mb-1 mt-24 flex flex-row w-full flex-1 justify-between'>
        <div className={'w-4/12 rounded-xl border-2 border-cyan-950 flex-col'}>
          <div className={'p-5'}>
            <Button
              onClick={() => {
                setNewNote(!newNote);
              }}
              label={'new note'}
              style={{ width: '100%', justifyContent: 'flex-end' }}
            />
          </div>
          <div>
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
            <ListItem label={'asdasdasd'} onClick={() => {}} />
          </div>
        </div>

        <div className={'w-8/12 pl-5 flex flex-1'}>
          {newNote && (
            <div
              className={
                'w-full border-2 border-cyan-900 rounded-2xl rounded-tl-none flex flex-row'
              }>
              <textarea
                value={inputText}
                onChange={(event) => {
                  setInputText(event.target.value);
                }}
                style={{
                  fontSize: 18,
                  caretColor: '#307F69',
                  outline: 'none',
                }}
                placeholder={" What's on your mind?"}
                className={
                  'bg-transparent h-full w-full p-3 m-5 cursor-text placeholder:text-emerald-500 text-emerald-100'
                }
              />
              <div
                className={
                  'w-20 py-3 border-2 border-cyan-900 border-r-0 border-b-0 border-t-0 flex flex-col items-center justify-between '
                }>
                <Button
                  onClick={() => {
                    setInputText('');
                  }}
                  label={'X'}
                  style={{ borderBottomRightRadius: 15 }}
                />
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
                <Button onClick={() => {}} label={'+'} style={{ borderBottomRightRadius: 15 }} />
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
