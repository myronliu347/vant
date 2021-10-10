// Utils
import { createNamespace, addUnit, noop, isPromise, isDef } from '../utils';
import { toArray, readFile, isOversize, isImageFile } from './utils';

// Mixins
import { FieldMixin } from '../mixins/field';

// Components
import Icon from '../icon';
import Image from '../image';
import Loading from '../loading';
import ImagePreview from '../image-preview';

import ajax from './ajax';

const [createComponent, bem] = createNamespace('uploader');

export default createComponent({
  inheritAttrs: false,

  mixins: [FieldMixin],

  // model: {
  //   prop: 'fileListprop',
  // },

  props: {
    url: { type: String, default: '/gateway/lowcode/api/v1/app/upload' },
    headers: Object,
    autoUpload: { type: Boolean, default: true },
    withCredentials: { type: Boolean, default: false },
    data: Object,
    urlField: { type: String, default: 'result' },
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: 'file',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    // fileList: {
    //   type: Array,
    //   default: () => [],
    // },
    fileListProp: {
      type: [Array,String],
      default: () => [],
    },
    maxSize: {
      type: [Number, String, Function],
      default: 50 || Number.MAX_VALUE,
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    showUpload: {
      type: Boolean,
      default: true,
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
    previewFullImage: {
      type: Boolean,
      default: true,
    },
    imageFit: {
      type: String,
      default: 'cover',
    },
    resultType: {
      type: String,
      default: 'dataUrl',
    },
    uploadIcon: {
      type: String,
      default: 'photograph',
    },
    converter: {
      type: String,
      default: 'json'
    },
    readonlyy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileList: this.fromValue(this.fileListProp)
    }
  },
  computed: {
    previewSizeWithUnit() {
      return addUnit(this.previewSize);
    },

    // for form
    value() {
      return this.toValue(this.fileList);
    },
  },
  watch: {
    fileListProp(val) {
      this.fileList = this.fromValue(val);
    }
  },
  methods: {
    fromValue(value) {
      if (this.converter === 'json')
          try {
            if(typeof value === 'string') return JSON.parse(value || '[]');
            if(typeof value === 'object') return value;
          } catch (err) {
            return [];
          }
        else
            return value || [];
    },
    toValue(value) {
        if (this.converter === 'json')
            // fix for u-validator rules="required"
            return Array.isArray(value) && value.length === 0 ? '[]' : JSON.stringify(value);
        else
            return value;
    },
    getDetail(index = this.fileList.length) {
      return {
        name: this.name,
        index,
      };
    },

    onChange(event) {
      let { files } = event.target;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        const response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if (isPromise(response)) {
          response
            .then((data) => {
              if (data) {
                this.readFile(data);
              } else {
                this.readFile(files);
              }
            })
            .catch(this.resetInput);

          return;
        }
      }

      this.readFile(files);
    },

    readFile(files) {
      const oversize = isOversize(files, this.maxSize);
      if (Array.isArray(files)) {
        const maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map((file) => readFile(file, this.resultType))).then(
          (contents) => {
            const fileList = files.map((file, index) => {
              const result = { file, status: '', message: '' };

              if (contents[index]) {
                result.content = contents[index];
              }

              return result;
            });

            this.onAfterRead(fileList, oversize);
          }
        );
      } else {
        readFile(files, this.resultType).then((content) => {
          const result = { file: files, status: '', message: '' };

          if (content) {
            result.content = content;
          }

          this.onAfterRead(result, oversize);
        });
      }
    },

    onAfterRead(files, oversize) {
      this.resetInput();

      let validFiles = files;

      if (oversize) {
        let oversizeFiles = files;
        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach((item) => {
            if (item.file) {
              if (isOversize(item.file, this.maxSize)) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }
        this.$emit('oversize', oversizeFiles, this.getDetail());
      }

      const isValidFiles = Array.isArray(validFiles)
        ? Boolean(validFiles.length)
        : Boolean(validFiles);

      if (isValidFiles) {
        const tempArr = [...this.fileList, ...toArray(validFiles)];
        // this.$emit('input', this.toValue(tempArr));
        // this.$emit('update:fileListProp', this.toValue(tempArr));

        this.fileList = tempArr;

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
        //this.$nextTick(function () {
        setTimeout(() => {
          this.fileList.forEach((file, index) => {
            if (!file.url) {
              file.status = 'uploading';
              file.message = '上传中...';
              this.post(file, index);
            }
          });
        }, 100)
        //});
      }
    },

    onDelete(file, index) {
      const beforeDelete = file.beforeDelete ?? this.beforeDelete;
      if (beforeDelete) {
        const response = beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if (isPromise(response)) {
          response
            .then(() => {
              this.deleteFile(file, index);
            })
            .catch(noop);
          return;
        }
      }

      this.deleteFile(file, index);
    },

    deleteFile(file, index) {
      const fileList = this.fileList.slice(0);
      fileList.splice(index, 1);

      this.$emit('input', this.toValue(fileList));
      this.$emit('update:fileListProp', this.toValue(fileList));
      this.$emit('delete', file, this.getDetail(index));
    },

    resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },

    onClickUpload(event) {
      this.$emit('click-upload', event);
      event.stopPropagation();
    },

    onPreviewImage(item) {
      if (!this.previewFullImage) {
        return;
      }

      const imageFiles = this.fileList.filter((item) => isImageFile(item));
      const imageContents = imageFiles.map((item) => item.content || item.url);

      this.imagePreview = ImagePreview({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: () => {
          this.$emit('close-preview');
        },
        ...this.previewOptions,
      });
    },

    // @exposed-api
    closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },

    // @exposed-api
    chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },

    genPreviewMask(item) {
      const { status, message } = item;

      if (status === 'uploading' || status === 'failed') {
        const MaskIcon =
          status === 'failed' ? (
            <Icon name="close" class={bem('mask-icon')} />
          ) : (
            <Loading class={bem('loading')} />
          );

        const showMessage = isDef(message) && message !== '';

        return (
          <div class={bem('mask')}>
            {MaskIcon}
            {showMessage && <div class={bem('mask-message')}>{message}</div>}
          </div>
        );
      }
    },

    genPreviewItem(item, index) {
      const deleteAble = item.deletable ?? this.deletable;
      const showDelete = item.status !== 'uploading' && deleteAble;

      const DeleteIcon = showDelete && (
        <div
          class={bem('preview-delete')}
          onClick={(event) => {
            event.stopPropagation();
            this.onDelete(item, index);
          }}
        >
          <Icon name="cross" class={bem('preview-delete-icon')} />
        </div>
      );

      const PreviewCoverContent = this.slots('preview-cover', {
        index,
        ...item,
      });

      const PreviewCover = PreviewCoverContent && (
        <div class={bem('preview-cover')}>{PreviewCoverContent}</div>
      );

      const previewSize = item.previewSize ?? this.previewSize;
      const imageFit = item.imageFit ?? this.imageFit;

      const Preview = isImageFile(item) ? (
        <Image
          fit={imageFit}
          src={item.content || item.url}
          class={bem('preview-image')}
          width={previewSize}
          height={previewSize}
          lazyLoad={this.lazyLoad}
          onClick={() => {
            this.onPreviewImage(item);
          }}
        >
          {PreviewCover}
        </Image>
      ) : (
        <div
          class={bem('file')}
          style={{
            width: this.previewSizeWithUnit,
            height: this.previewSizeWithUnit,
          }}
        >
          <Icon class={bem('file-icon')} name="description" />
          <div class={[bem('file-name'), 'van-ellipsis']}>
            {item.file ? item.file.name : item.url}
          </div>
          {PreviewCover}
        </div>
      );

      return (
        <div
          class={bem('preview')}
          onClick={() => {
            this.$emit('click-preview', item, this.getDetail(index));
          }}
        >
          {Preview}
          {this.genPreviewMask(item)}
          {DeleteIcon}
        </div>
      );
    },

    genPreviewList() {
      if (this.previewImage) {
        return this.fileList.map(this.genPreviewItem);
      }
    },

    genUpload() {
      if (this.readonlyy) return;
      if (this.fileList.length >= this.maxCount || !this.showUpload) {
        return;
      }

      const slot = this.slots();

      const Input = this.readonly ? null : (
        <input
          {...{ attrs: this.$attrs }}
          ref="input"
          type="file"
          accept={this.accept}
          class={bem('input')}
          disabled={this.disabled}
          onChange={this.onChange}
        />
      );

      if (slot) {
        return (
          <div
            class={bem('input-wrapper')}
            key="input-wrapper"
            onClick={this.onClickUpload}
          >
            {slot}
            {Input}
          </div>
        );
      }

      let style;
      if (this.previewSize) {
        const size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size,
        };
      }

      return (
        <div
          class={bem('upload', { readonly: this.readonly })}
          style={style}
          onClick={this.onClickUpload}
        >
          <Icon name={this.uploadIcon} class={bem('upload-icon')} />
          {this.uploadText && (
            <span class={bem('upload-text')}>{this.uploadText}</span>
          )}
          {Input}
        </div>
      );
    },

    post(file, index) {
      const xhr = ajax({
          url: this.url,
          headers: this.headers,
          withCredentials: this.withCredentials,
          file,
          data: this.data,
          name: 'file',
          onProgress: (e) => {
              // file.status = 'uploading';
              // file.message = e.percent + '%' || '上传中...';
              this.$emit('progress', {
                  e, file, file, xhr,
              }, this);
          },
          onSuccess: (res) => {
              file.status = '';
              file.message = '';
              if (res[this.urlField]) {
                file.url = res[this.urlField];
              }
              file.response = res;
              this.$emit('success', {
                  res,
                  file,
                  file,
                  xhr,
              }, this);
              setTimeout(() => {
                const value = this.fileList.filter(file => file.url && file.url.length > 0).map(file => {
                  return {url: file.url}
                })
                this.$emit('input', this.toValue(value));
                this.$emit('update:fileListProp', this.toValue(value));
              }, 500)

          },
          onError: (e, res) => {
              file.status = 'failed';
              file.message = '上传失败';
              this.$emit('error', {
                  e,
                  res,
                  file,
                  file,
                  xhr,
              }, this);

              // setTimeout(() => {
              //   const value = this.fileList.filter(file => file.url && file.url.length > 0).map(file => file.url);
              //   this.$emit('input', this.toValue(value));
              //   this.$emit('update:fileListProp', this.toValue(value));
              // }, 500)
          },
      });
    },
  },

  render() {
    return (
      <div class={bem()} {...{ attrs: this.$attrs }}>
        <div class={bem('wrapper', { disabled: this.disabled })}>
          {this.genPreviewList()}
          {this.genUpload()}
        </div>
      </div>
    );
  },
});
