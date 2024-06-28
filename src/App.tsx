import { useRef, useState } from 'react';
import './App.css';

import { MaskEditor } from './components/MaskEditor/MaskEditor';
import { toMask } from './utils/MaskUtils';
import { AppShell, Burger, Button, Divider, FileButton, Group, Slider, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const canvas = useRef<HTMLCanvasElement>();
  const [opened, { toggle }] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [cursorSize, setCursorSize] = useState<number>(10);

  return (
    <AppShell header={{ height: 60 }} aside={{ width: '20%', breakpoint: 'sm' }} padding="md">
      <AppShell.Header p={10}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group align="center">
          <Text fw={700}>Mask Images</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <MaskEditor src="/cat2.jpeg" canvasRef={canvas} cursorSize={cursorSize} />
      </AppShell.Main>

      <AppShell.Aside p={10}>
        <Stack justify="space-between" h={'100%'}>
          <Stack>
            <Text size="sm">Brush Size</Text>

            <Slider
              radius="sm"
              marks={[
                { value: 5, label: '20%' },
                { value: 15, label: '50%' },
                { value: 25, label: '80%' },
              ]}
              min={2}
              max={30}
              onChange={(val) => {
                setCursorSize(val);
              }}
            />
            <Divider mt={10} />
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                const ctx = canvas.current.getContext('2d');
                const width = canvas.current.width;
                const height = canvas.current.height;
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);
              }}
            >
              Clear
            </Button>
          </Stack>
          <Stack>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button size="sm" {...props}>
                  Upload image
                </Button>
              )}
            </FileButton>
            <Button variant="Filled" size="xs" onClick={() => console.log(toMask(canvas.current))}>
              Get Mask
            </Button>
          </Stack>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
}

export default App;
