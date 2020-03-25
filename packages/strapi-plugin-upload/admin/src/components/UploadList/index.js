import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@buffetjs/core';

import { createMatrix, getTrad } from '../../utils';

import ModalSection from '../ModalSection';
import IntlText from '../IntlText';
import Container from './Container';
import ButtonWrapper from './ButtonWrapper';
import RowItem from './RowItem';
import ListTitle from './ListTitle';

const UploadList = ({
  filesToUpload,
  onClickCancelUpload,
  onClickDeleteFileToUpload,
  onClickEditNewFile,
  onGoToAddBrowseFiles,
}) => {
  const matrix = createMatrix(filesToUpload);
  const filesToUploadLength = filesToUpload.length;
  const titleId = `modal.upload-list.sub-header-title.${
    filesToUploadLength > 1 ? 'plural' : 'singular'
  }`;

  return (
    <>
      <ModalSection justifyContent="space-between">
        <div>
          <ListTitle id={getTrad(titleId)} values={{ number: filesToUploadLength }} />
          <IntlText
            id={getTrad('modal.upload-list.sub-header-subtitle')}
            values={{ number: filesToUploadLength }}
            fontSize="sm"
            color="grey"
          />
        </div>
        <ButtonWrapper>
          <Button type="button" color="primary" onClick={onGoToAddBrowseFiles}>
            <IntlText
              id={getTrad('modal.upload-list.sub-header.button')}
              fontWeight="bold"
              color="white"
            />
          </Button>
        </ButtonWrapper>
      </ModalSection>
      <ModalSection>
        <Container>
          {matrix.map(({ key, rowContent }) => {
            return (
              <div className="row" key={key}>
                {rowContent.map(data => {
                  return (
                    <RowItem
                      {...data}
                      onClick={onClickCancelUpload}
                      onClickDeleteFileToUpload={onClickDeleteFileToUpload}
                      onClickEdit={onClickEditNewFile}
                      key={data.originalIndex}
                    />
                  );
                })}
              </div>
            );
          })}
        </Container>
      </ModalSection>
    </>
  );
};

UploadList.defaultProps = {
  filesToUpload: [],
  onClickCancelUpload: () => {},
  onClickDeleteFileToUpload: () => {},
  onClickEditNewFile: () => {},
  onGoToAddBrowseFiles: () => {},
};

UploadList.propTypes = {
  filesToUpload: PropTypes.array,
  onClickCancelUpload: PropTypes.func,
  onClickDeleteFileToUpload: PropTypes.func,
  onClickEditNewFile: PropTypes.func,
  onGoToAddBrowseFiles: PropTypes.func,
};

export default UploadList;
