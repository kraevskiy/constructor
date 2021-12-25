import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import {
  Layers,
  CardGiftcard,
  ArrowBackIos,
  ArrowForwardIos,
} from "@material-ui/icons";
import {
  Tabs,
  Tab,
  Typography,
  IconButton,
  MuiThemeProvider,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import {
  CallMissed,
  CallMissedOutgoing,
  BurstMode,
  TextFields,
  DeleteForever,
  AspectRatio,
  Add,
  Remove,
  CropFree,
  BorderHorizontal,
} from "@material-ui/icons";
import cn from "classnames";
import { useParams } from "react-router";

//Components
import FabricEditor, {
  MatchParams,
} from "./_components/FabricEditor/FabricEditor";
import LayersSection from "./_components/LayersSection/LayersSection";
import ImagesSection from "./_components/ImagesSection/ImagesSection";
import FontsSection from "./_components/FontsSection/FontsSection";
import SettingsComponent from "./_components/SettingsComponent/SettingsComponent";
import SettingsSection from "./_components/SettingsSection/SettingsSection";
import PrefabsSection from "./_components/PrefabsSection/PrefabsSection";

//Helpers
import {
  changeHistory,
  setHistoryMoment,
  changeScale,
  setEditorHeight,
} from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";
import theme from "./theme";
import style from "./ConstructorPage.module.scss";
import Loader from "../../components/Loader/Loader";

const ConstructorPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id, type } = useParams<MatchParams>();
  const {
    editor: { instance, history, history_n, scaleRatio, editorHeight },
  } = useSelector((state: RootState) => state);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [leftBarVisible, setLeftBarVisible] = useState<boolean>(false);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const [visible, setVisible] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const canvas = instance;

  useEffect(() => {
    setVisible(false);
    setTimeout(() => setVisible(true), 999);
  }, [type, id]);

  useEffect(() => {
    if (canvas) document.addEventListener("keydown", KeyPress, false);
  }, [canvas]);

  const KeyPress = async (e: KeyboardEvent) => {
    if (e.code === "Delete" && canvas) {
      const objects = canvas.getActiveObjects();
      for (let i = 0; i < objects.length; i++)
        await deleteLayer(canvas.getObjects().indexOf(objects[i]));
    }
    // console.log(e);
  };

  const deleteLayer = async (index: number) => {
    if (canvas) {
      const item = canvas.item(index) as unknown as fabric.Object;
      if (!item.selectable) return;
      canvas.setActiveObject(
        new fabric.ActiveSelection([], {
          canvas: canvas,
        })
      );
      setItemIndex(-1);

      canvas.remove(item);
      canvas.requestRenderAll();
      dispatch(changeHistory());
    }
  };

  const switchLayers = (index: number, value: number, absolute = false) => {
    if (canvas) {
      const item = canvas.item(index) as unknown as fabric.Object;
      if (absolute) {
        item.moveTo(value > 0 ? canvas.getObjects().length - 1 : 0);
      } else {
        const index_n = index + value;
        item.moveTo(index_n);
      }

      canvas.discardActiveObject();
      canvas.requestRenderAll();

      dispatch(changeHistory());
    }
  };

  const selectElement = (index: number) => {
    //This is make selection with strict area, we don't need it for now
    // canvas.discardActiveObject();
    // if (canvas.item(index).selectable) {
    //   var sel = new fabric.ActiveSelection([canvas.item(index)], {
    //     canvas: canvas,
    //   });
    //   canvas.setActiveObject(sel);
    // }
    // canvas.requestRenderAll();
    if (canvas) {
      // console.log("canvas.item(index)", canvas.item(index));
      canvas.setActiveObject(canvas.item(index) as unknown as fabric.Object);
      canvas.renderAll();
    }
  };

  const copyLayer = (index: number, clean = false) => {
    if (!canvas) return null;
    canvas.item(index).clone((clone: fabric.Object) => {
      canvas.discardActiveObject();
      const original = canvas.item(index) as unknown as fabric.Object;
      if (!clean)
        clone.set({
          left: (original.left as number) + 10,
          top: (original.top as number) + 10,
          evented: true,
        });
      if (clone.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        clone.canvas = canvas;
        (clone as unknown as fabric.StaticCanvas).forEachObject(function (obj) {
          canvas.add(obj);
        });
        // this should solve the unselectability
        clone.setCoords();
      } else {
        canvas.add(clone);
      }

      attachListeners(clone);

      if (!clean) {
        canvas.setActiveObject(clone);
        canvas.requestRenderAll();
        dispatch(changeHistory());
      }
    });
  };

  const attachListeners = (item: fabric.Object) => {
    // console.log('item', item);
    item.on("modified", () => dispatch(changeHistory()));
    if (canvas) {
      item.on("selected", () =>
        setItemIndex(canvas.getObjects().indexOf(item))
      );
      item.on("deselected", () => {
        setItemIndex(-1);
        if (item.type === "textbox" || item.type === "text") {
          const textItem = item as fabric.Textbox;
          textItem.text = textItem.text ?? "";
          canvas.requestRenderAll();
        }
      });
    }
  };

  const clearCanvas = () => {
    dispatch(changeHistory(true));
    instance?.clear();
  };

  const undoRedo = async (direction: number) => {
    const h_index_n =
      history_n + (history_n > 0 || direction > 0 ? direction : 0);

    const fabric_instance = history[h_index_n];

    canvas?.loadFromJSON(fabric_instance, () => {
      // console.log("CANVAS: ", JSON.stringify(canvas));

      for (let i = 0; i < canvas.getObjects().length; i++) {
        const item = canvas.item(i) as unknown as fabric.Object;
        attachListeners(item);
      }

      dispatch(setHistoryMoment(h_index_n));
    });
  };

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setTabIndex(value);
    setLeftBarVisible(true);
  };

  const redoActive = history_n < history.length - 1;
  const undoActive = history.length > 0;

  const tab_s = {
    // backgroundColor: 'red',
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: -45,
    fontSize: 9,
    color: "white",
  };

  useLayoutEffect(() => {
    if (editorRef.current)
      dispatch(setEditorHeight(editorRef.current.offsetHeight));
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={style.constructor_content}>
        <div
          className={cn(style.menu_container, {
            [style.opened]: leftBarVisible,
          })}
        >
          <div className={style.tabs_container}>
            <Tabs
              className={style.tabs}
              variant="fullWidth"
              orientation={"vertical"}
              value={tabIndex}
              onChange={handleChange}
            >
              <Tab
                style={tab_s}
                label="Слои"
                icon={<Layers style={{ color: "white" }} />}
              />
              <Tab
                style={tab_s}
                label="Макеты"
                icon={<CardGiftcard style={{ color: "white" }} />}
              />
              <Tab
                style={tab_s}
                label="Картинки"
                icon={<BurstMode style={{ color: "white" }} />}
              />
              <Tab
                style={tab_s}
                label="Текст"
                icon={<TextFields style={{ color: "white" }} />}
              />
              <Tab
                style={tab_s}
                label="Полотно"
                icon={<AspectRatio style={{ color: "white" }} />}
              />
            </Tabs>

            <div className={style.bottomButtons}>
              <IconButton style={{}} onClick={() => clearCanvas()}>
                <DeleteForever style={{ color: "white" }} />
              </IconButton>
              <IconButton
                disabled={!undoActive}
                style={{}}
                onClick={() => undoRedo(-1)}
              >
                <CallMissed style={{ color: undoActive ? "white" : "grey" }} />
              </IconButton>
              <IconButton
                disabled={!redoActive}
                style={{}}
                onClick={() => undoRedo(+1)}
              >
                <CallMissedOutgoing
                  style={{ color: redoActive ? "white" : "grey" }}
                />
              </IconButton>
            </div>
          </div>

          <SwipeableViews
            className={style.list_container}
            slideClassName={style.tab_slide}
            axis="x-reverse"
            // axis={theme.direction === 'rtl' ? 'y-reverse' : 'y'}
            index={tabIndex}
            onChangeIndex={setTabIndex}
          >
            <LayersSection
              selectElement={selectElement}
              switchLayers={switchLayers}
              deleteLayer={deleteLayer}
              copyLayer={copyLayer}
              setItemIndex={setItemIndex}
            />

            <PrefabsSection />

            <ImagesSection
              setItemIndex={setItemIndex}
              attachListeners={attachListeners}
            />

            <FontsSection setItemIndex={setItemIndex} />

            <SettingsSection />
          </SwipeableViews>

          <div
            onMouseDown={() => setLeftBarVisible(!leftBarVisible)}
            className={style.left_bar_fold_btn}
          >
            {leftBarVisible ? (
              <ArrowBackIos style={{ color: "white", width: 10, height: 15 }} />
            ) : (
              <ArrowForwardIos
                style={{ color: "white", width: 10, height: 15 }}
              />
            )}
          </div>
        </div>

        <div className={style.editor_wrapper} ref={editorRef}>
          <div className={style.editor_container}>
            {visible ? (
              <FabricEditor attachListeners={attachListeners} />
            ) : (
              <Loader />
            )}
          </div>

          {instance && itemIndex >= 0 && (
            <SettingsComponent
              index={itemIndex}
              copyLayer={copyLayer}
              deleteLayer={deleteLayer}
              switchLayers={switchLayers}
            />
          )}
        </div>

        <div className={style.scallerWrapper}>
          <IconButton onClick={() => dispatch(changeScale(0.1))}>
            <Add />
          </IconButton>

          <Typography style={{ color: "white" }} variant="h6" noWrap>{`${(
            scaleRatio * 100
          ).toFixed(0)} %`}</Typography>

          <IconButton onClick={() => dispatch(changeScale(-0.1))}>
            <Remove />
          </IconButton>
          <IconButton onClick={() => dispatch(changeScale(editorHeight))}>
            <CropFree />
          </IconButton>
          <IconButton onClick={() => dispatch(changeScale(0))}>
            <BorderHorizontal />
          </IconButton>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default ConstructorPage;

export interface FabricItem extends fabric.StaticCanvas {
  selectable?: boolean;
  evented?: boolean;
}

export interface History {
  instance: string;
}
