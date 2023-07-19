import React from 'react'
import styled from 'styled-components'

const TagColor = {
  노래: '#C6E5AD',
  게임: '#FEF7EE',
  미디어: '#FCEBE3',
  스포츠: '#F7DAD8',
  패션: '#FAE9CF',
  요리: 'C1BEE1',
  펫: '#fafcde',
}

const CardContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin-bottom: 1rem;
`

const Card = styled.div`
  // border-left: 4px solid ${props => props.borderColor || 'rgba(0, 0, 0, 0)'};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  background-color: #fff;
  background: linear-gradient(135deg, ${props => props.borderColor}, white);
  border-radius: 15px;
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

const Tag = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  color: ${props => props.borderColor};
`

const Host = styled.div`
  font-size: 0.85rem;
  color: #333;
`

const Icon = styled.i`
  font-size: 2rem;
  color: #ccc;
`

const ExampleCard = ({ id, title, host, summary, tag, onClick }) => {
  return (
    <CardContainer onClick={() => onClick(id)}>
      <Card borderColor={TagColor[tag]}>
        <CardBody>
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <Title>{title}</Title>
              <Tag>{tag}</Tag>
              <Host>{host}</Host>
              <p>
                {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
              </p>
            </div>
            {/* <div className="col-auto">
              <Icon className="fas fa-calendar"></Icon>
            </div> */}
          </div>
        </CardBody>
      </Card>
    </CardContainer>
  )
}

export default ExampleCard
