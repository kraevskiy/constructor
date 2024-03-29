import { InputFileProps } from './InputFile.props';
import cls from './InputFile.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import Axios from '../../helpers/Axios';
import { ImageListType } from 'react-images-uploading/dist/typings';
import { logout as logoutIcon } from '../../images/icons';
import { toast } from 'react-toastify';

export interface TypeResponseUpload {
	name: string;
	url: string;
}

const InputFile = forwardRef(({className, url, setValue}: InputFileProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [img, setImg] = useState<ImageListType>([]);
	const onChange = (imageList: ImageListType) => {
		setImg(imageList);
	};

	const uploadImg = async () => {
		const formData = new FormData();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		formData.append('files', img[0].file);
		await Axios.post<TypeResponseUpload[]>(`${process.env.REACT_APP_FILES_UPLOAD}`, formData)
			.then(({data}) => {
				setValue(data[0].url);
				toast.success('uploaded');
			});
	};

	return (
		<div
			ref={ref}
			className={cn(className, cls.wrapper)}
		>
			<ImageUploading
				multiple={false}
				value={img}
				onChange={onChange}
				maxNumber={69}
			>
				{({
					imageList,
					onImageUpload,
					isDragging,
					dragProps,
				}) => {
					return (
						<div className={cls.body}>
							{imageList.length < 1 && <>
                <button
                  type="button"
                  className={cn('btn btn-icon', cls.btn)}
                  style={isDragging ? {color: 'red'} : undefined}
                  onClick={onImageUpload}
									{...dragProps}
                >
                  <img src={logoutIcon} alt=""/>
                </button>
              </>}
							{
								imageList.length === 0 && <img src={url} alt="" width="100"/>
							}
							{imageList.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image['dataURL']} alt="" width="100"/>
									<div className="image-item__btn-wrapper">
										<button type="button" className={cn('btn btn-icon', cls.btn)} onClick={uploadImg}><img src={logoutIcon} alt=""/></button>
									</div>
								</div>
							))}
						</div>
					);
				}}
			</ImageUploading>
		</div>
	);
});

export default InputFile;
