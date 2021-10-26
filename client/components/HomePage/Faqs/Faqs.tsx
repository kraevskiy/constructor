import cls from './Faqs.module.scss';
import clsParent from './../Home.module.scss';
import { FaqsProps } from './Faqs.props';
import cn from 'classnames';
import { BlockHead } from '../../';
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel
} from 'react-accessible-accordion';
import { FaqItemsPage } from '../../../interfaces/HomePropsInterface';

export const Faqs = ({data, lang}: FaqsProps): JSX.Element => {
	const getCorrectList = (list: FaqItemsPage[]): FaqItemsPage[][] => {
		const res: FaqItemsPage[][] = [[], []];
		list.forEach((item, index) => {
			if (index % 2 == 0) {
				res[0].push(item);
			} else {
				res[1].push(item);
			}
		});
		return res;
	};

	const list: FaqItemsPage[][] = getCorrectList(data.items);

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang as string]}
				</BlockHead>
				<Accordion allowZeroExpanded className={cls.body}>
					<div className={cls.list}>
						{
							list[0].map(faq => {
								return (
									<AccordionItem key={faq._id} className={cls.listItem}>
										<AccordionItemHeading className={cls.listHeading}>
											<AccordionItemButton className={cls.listButton}>
												<span>{faq.title?.[lang as string]}</span>
												<span className={cn(cls.plus, 'plus')}/>
											</AccordionItemButton>
										</AccordionItemHeading>
										<AccordionItemPanel className={cls.listBody}>
											{faq.text?.[lang as string]}
										</AccordionItemPanel>
									</AccordionItem>
								);
							})
						}
					</div>
					<div className={cls.list}>
						{
							list[1].map(faq => {
								return (
									<AccordionItem key={faq._id} className={cls.listItem}>
										<AccordionItemHeading className={cls.listHeading}>
											<AccordionItemButton className={cls.listButton}>
												<span>{faq.title?.[lang as string]}</span>
												<span className={cn(cls.plus, 'plus')}/>
											</AccordionItemButton>
										</AccordionItemHeading>
										<AccordionItemPanel className={cls.listBody}>
											{faq.text?.[lang as string]}
										</AccordionItemPanel>
									</AccordionItem>
								);
							})
						}
					</div>
				</Accordion>
			</div>
		</section>
	);
};
