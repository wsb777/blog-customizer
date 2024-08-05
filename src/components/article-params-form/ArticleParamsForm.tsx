import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	setStyle: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

	const [formSetting, setFormSetting] =
		useState<ArticleStateType>(defaultArticleState);
	const onChange = (styleElement: string) => {
		return (value: OptionType) => {
			setFormSetting((oldFormState) => ({
				...oldFormState,
				[styleElement]: value,
			}));
		};
	};
	useEffect(() => {
		const handleClick = (e: Event) => {
			if (
				!(e.target as HTMLElement).closest('aside') &&
				!(e.target as HTMLElement).closest('div[role="button"]')
			) {
				setMenuVisible(false);
			}
		};
		if (isMenuVisible === true) {
			document.addEventListener('click', handleClick);
		}

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [isMenuVisible]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.setStyle(formSetting);
	};
	const onReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.setStyle(defaultArticleState);
		setFormSetting(defaultArticleState);
	};
	return (
		<>
			<ArrowButton
				isVisible={isMenuVisible}
				onClick={() => setMenuVisible(true)}
			/>
			<aside
				className={clsx(
					styles.container,
					isMenuVisible && styles.container_open
				)}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formSetting.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={onChange('fontFamilyOption')}
					/>
					<RadioGroup
						selected={formSetting.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						name='fontSizeOption'
						onChange={onChange('fontSizeOption')}
					/>
					<Select
						selected={formSetting.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={onChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formSetting.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={onChange('backgroundColor')}
					/>
					<Select
						selected={formSetting.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={onChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
