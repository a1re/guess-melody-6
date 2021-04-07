import React from 'react';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './audio-player';

describe(`Audio Player`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`AudioPlayer should render correctly`, () => {
    const mockPath = `mock-path`;
    const {container} = render(
        <AudioPlayer
          isPlaying={true}
          src={mockPath}
          onPlayButtonClick={jest.fn()}
        />
    );

    expect(screen.getByRole(`button`)).toBeInTheDocument();
    expect(container.querySelector(`audio`)).toBeInTheDocument();
    expect(screen.getByRole(`button`)).toHaveAttribute(`disabled`);
  });

  it(`AudioPlayer should play melody when data is loaded`, () => {
    const mockPath = `mock-path`;
    const playButtonClickHandle = jest.fn();
    const {container} = render(
        <AudioPlayer
          isPlaying={true}
          src={mockPath}
          onPlayButtonClick={playButtonClickHandle}
        />
    );

    const audioElement = container.querySelector(`audio`);

    act(() => {
      fireEvent(audioElement, new Event(`canplaythrough`));
    });

    expect(screen.getByRole(`button`)).not.toHaveAttribute(`disabled`);

    userEvent.click(screen.getByRole(`button`));
    expect(playButtonClickHandle).toBeCalled();
  });
});
