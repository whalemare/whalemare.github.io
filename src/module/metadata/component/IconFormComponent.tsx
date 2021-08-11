import { makeStyles, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { FileError, useDropzone } from 'react-dropzone'

import { useStrings } from '../../locale/useStrings'
interface IconFormComponentProps {}

const useStyles = makeStyles((theme) => ({
  selector: {
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  text: {
    padding: theme.spacing(4),
  },
  previewSquare: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 240,
    height: 240,
    padding: 4,
    boxSizing: 'border-box',
  },
  previewLong: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 480,
    height: 240,
    padding: 4,
    boxSizing: 'border-box',
  },
  previewInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  previewImage: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
}))

export const IconFormComponent = observer<IconFormComponentProps>(({}) => {
  const strings = useStrings()
  const styles = useStyles()

  return (
    <>
      <DropFile
        previewStyle={styles.previewSquare}
        sizes={{
          width: 1024,
          height: 1024,
        }}
        title={strings.selectAppIcon}
        onChanges={(files) => console.log('files', files)}
      />
      <DropFile
        previewStyle={styles.previewLong}
        sizes={{
          width: 1024,
          height: 500,
        }}
        title={strings.selectAppPromo}
        onChanges={(files) => console.log('files', files)}
      />
    </>
  )
})

const DropFile = observer<{
  title: string
  onChanges: (files: File[]) => void
  previewStyle: any
  sizes: { width: number; height: number }
  description?: string
}>(({ title, onChanges, previewStyle, sizes, description }) => {
  const styles = useStyles()
  const strings = useStrings()

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    maxSize: 1000000 * 2, // 2MB
    multiple: false,
    validator: (file) => {
      const errors: FileError[] = []
      // @ts-ignore
      const fileWidth = file.width as number
      // @ts-ignore
      const fileHeight = file.height as number
      if (fileWidth < sizes.width) {
        errors.push({
          code: 'small-width',
          message: `${strings.errorImageWidth} ${sizes.width}, ${strings.butReceived} ${fileWidth}`,
        })
      }
      // @ts-ignore
      if (fileHeight < sizes.height) {
        errors.push({
          code: 'small-height',
          message: `${strings.errorImageHeight} ${sizes.height}, ${strings.butReceived} ${fileHeight}`,
        })
      }

      if (errors.length) {
        return errors
      }
      return null
    },
    getFilesFromEvent: async (event) => {
      // @ts-ignore
      const files: File[] = event?.target?.files || []
      const promises: Promise<File>[] = []
      for (const file of files) {
        const promise = new Promise<File>((resolve) => {
          const image = new Image()
          image.onload = function () {
            console.log('onload', file)
            // @ts-ignore
            file.width = image.width
            // @ts-ignore
            file.height = image.height
            resolve(file)
          }
          image.src = URL.createObjectURL(file)
        })
        promises.push(promise)
      }
      return await Promise.all(promises)
    },
  })

  useEffect(() => {
    if (fileRejections.length) {
      alert(fileRejections.map((it) => it.errors.map((error) => error.message).join('\n')).join('\n'))
    }
  }, [fileRejections])

  useEffect(() => {
    if (acceptedFiles) {
      onChanges(acceptedFiles)
    }
  }, [acceptedFiles, onChanges])

  const previews = useMemo(() => {
    return acceptedFiles.map((file) => {
      return (
        <div className={previewStyle} key={file.name}>
          <div className={styles.previewInner}>
            <img className={styles.previewImage} src={URL.createObjectURL(file)} />
          </div>
        </div>
      )
    })
  }, [acceptedFiles, previewStyle, styles.previewImage, styles.previewInner])

  return (
    <div>
      <section className={styles.selector}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Typography className={styles.text} variant="h6">
            {title} ({sizes.width}x{sizes.height})
          </Typography>
          <em>{description}</em>
        </div>
      </section>
      <aside>{previews}</aside>
    </div>
  )
})
