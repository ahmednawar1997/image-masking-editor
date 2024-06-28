import { useRef, useState } from 'react';
import './App.css';

import { MaskEditor } from './components/MaskEditor/MaskEditor';
import { toMask } from './utils/MaskUtils';
import { AppShell, Button, Divider, FileButton, Group, Slider, Stack, Text, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

function App() {
  const canvas = useRef<HTMLCanvasElement>();
  const [file, setFile] = useState<File | null>(null);
  const [cursorSize, setCursorSize] = useState<number>(10);
  const buttonsDisabled = file === null;

  return (
    <AppShell aside={{ width: '20%', breakpoint: 'sm' }} padding="md">
      <AppShell.Main>
        {file ? (
          <MaskEditor src={file ? URL.createObjectURL(file) : ''} canvasRef={canvas} cursorSize={cursorSize} />
        ) : (
          <Stack h={'100%'}>
            <Text size="xl">Mask your images. Upload image to get started</Text>
            <Dropzone
              onDrop={(files) => setFile(files[0])}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
              maxFiles={1}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    File should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Stack>
        )}
      </AppShell.Main>

      <AppShell.Aside p={10}>
        <Stack justify="space-between" h={'100%'}>
          <Stack>
            <Text size="md" fw={600}>
              Controls
            </Text>
            <Divider />

            <FileButton
              onChange={(file) => {
                setFile(file);
              }}
              accept="image/png,image/jpeg"
              disabled={buttonsDisabled}
            >
              {(props) => (
                <Button size="sm" {...props} disabled={buttonsDisabled}>
                  Upload image
                </Button>
              )}
            </FileButton>
          </Stack>
          <Stack>
            <Text size="sm">Brush Size</Text>

            <Slider
              radius="sm"
              defaultValue={10}
              mb={20}
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
              disabled={buttonsDisabled}
            />
            <Button
              disabled={buttonsDisabled}
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
              Clear Mask
            </Button>
            <Button variant="Filled" size="xs" onClick={() => console.log(toMask(canvas.current))} disabled={buttonsDisabled}>
              Download Mask
            </Button>
          </Stack>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
}

export default App;
